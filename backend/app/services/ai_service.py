"""
Centralized AI service using the Google GenAI SDK (google-genai).
All AI-powered features (soil OCR, crop analysis, disease detection, chat)
call through this module so swapping to OpenAI/Claude later only requires
changes here.
"""
import json
import logging
from pathlib import Path

from google import genai
from google.genai import types

from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

# ── Client initialisation ──────────────────────────────────────────
_client = None

def _get_client() -> genai.Client:
    """Lazy-initialise the Gemini client."""
    global _client
    if _client is None:
        if not settings.GEMINI_API_KEY:
            raise RuntimeError("GEMINI_API_KEY is not set.")
        _client = genai.Client(api_key=settings.GEMINI_API_KEY)
    return _client


# ── Document / image analysis ──────────────────────────────────────
def analyze_document_with_gemini(prompt: str, file_path: str, mime_type: str) -> dict:
    """Upload a file and ask Gemini to return structured JSON."""
    if not settings.GEMINI_API_KEY:
        logger.error("Attempted to use Gemini API without an API key.")
        return {}

    try:
        client = _get_client()

        # Upload the file
        uploaded_file = client.files.upload(
            file=file_path,
            config=types.UploadFileConfig(mime_type=mime_type),
        )

        # Generate content with JSON output
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_uri(
                            file_uri=uploaded_file.uri,
                            mime_type=uploaded_file.mime_type,
                        ),
                        types.Part.from_text(text=prompt),
                    ],
                )
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            ),
        )

        return json.loads(response.text)

    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}")
        return {}


# ── Chat ───────────────────────────────────────────────────────────
def generate_chat_with_gemini(message: str, history: list = None) -> str | None:
    """
    Send a chat message with optional conversation history.
    `history` is a list of ChatHistory ORM objects (with .role and .content).
    """
    if not settings.GEMINI_API_KEY:
        return (
            "I am currently running in offline mode. "
            "Please configure the GEMINI_API_KEY to enable my AI capabilities."
        )

    try:
        client = _get_client()

        # Build conversation turns from DB history
        contents: list[types.Content] = []
        if history:
            for msg in history:
                role = "user" if msg.role == "user" else "model"
                contents.append(
                    types.Content(role=role, parts=[types.Part.from_text(text=msg.content)])
                )

        # Add the current user message if not already part of history
        if not contents or contents[-1].parts[0].text != message:
            contents.append(
                types.Content(role="user", parts=[types.Part.from_text(text=message)])
            )

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=contents,
        )

        return response.text

    except Exception as e:
        logger.error(f"Error calling Gemini Chat: {e}")
        return None
