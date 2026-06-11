"""
Chat service with pluggable LLM backend.
Currently uses Google Gemini. Can be swapped to OpenAI or Claude
by changing the implementation of generate_chat_response() without
touching the route or frontend.
"""
import logging
from app.core.config import get_settings
from app.services.ai_service import generate_chat_with_gemini

logger = logging.getLogger(__name__)
settings = get_settings()

# System prompt that shapes the assistant's personality
SYSTEM_PROMPT = """You are AgroVision AI Assistant, an expert agricultural advisor.
You help farmers with:
- Crop recommendations based on soil and climate
- Soil health guidance and fertilizer suggestions
- Plant disease identification and management
- Irrigation planning and water management
- Weather-based farming decisions
- Market information and selling strategies
- General agriculture knowledge

Always provide practical, actionable advice. When you don't have enough
information, ask clarifying questions about the farmer's location, soil type,
current season, or crop variety. Keep responses concise but thorough.
Respond in a friendly, professional tone."""


def generate_chat_response(message: str, history: list = None) -> str:
    """
    Generate a response using the configured LLM backend.
    Falls back to a rule-based system if no API key is configured or if the API call fails.

    Args:
        message: The user's message
        history: List of ChatHistory ORM objects for context
    """
    if settings.GEMINI_API_KEY:
        # Prepend system prompt as the first user turn if history is empty
        enriched_message = message
        if not history:
            enriched_message = f"{SYSTEM_PROMPT}\n\nUser question: {message}"

        response = generate_chat_with_gemini(enriched_message, history)
        if response is not None:
            return response
        else:
            logger.warning("Gemini API call returned None. Falling back to rule-based response system.")

    # Fallback: rule-based responses when no API key is set or API fails
    return _rule_based_response(message)


def _rule_based_response(message: str) -> str:
    """Keyword-based fallback when no LLM API key is configured."""
    import re

    RESPONSES = [
        {
            "keywords": ["ph", "acid", "alkaline", "soil"],
            "response": (
                "Based on typical soil profiles, if your pH is outside the 6.0-7.0 "
                "range, nutrient availability decreases. For acidic soil (pH < 6.0), "
                "consider applying agricultural lime. For alkaline soil (pH > 7.5), "
                "adding elemental sulfur or organic matter can help."
            ),
        },
        {
            "keywords": ["nitrogen", "npk", "fertilizer", "yellow"],
            "response": (
                "Yellowing of older leaves often indicates nitrogen deficiency. "
                "A quick application of urea or a balanced NPK fertilizer can address "
                "this. For a long-term organic solution, consider incorporating compost "
                "or planting leguminous cover crops."
            ),
        },
        {
            "keywords": ["tomato", "blight", "spot", "disease"],
            "response": (
                "Tomatoes are highly susceptible to early and late blight, especially "
                "in humid conditions. Ensure adequate spacing for airflow, avoid "
                "overhead watering, and apply a preventative copper-based fungicide."
            ),
        },
        {
            "keywords": ["paddy", "rice", "water", "irrigation"],
            "response": (
                "For paddy, maintaining proper water levels is crucial. During the "
                "vegetative stage, shallow submergence (2-3 cm) is ideal. Consider "
                "Alternate Wetting and Drying (AWD) to save water while maintaining yields."
            ),
        },
        {
            "keywords": ["weather", "rain", "monsoon", "dry"],
            "response": (
                "If heavy rain is expected, ensure field drainage is clear to prevent "
                "waterlogging. If a dry spell is forecasted, schedule deep irrigation "
                "now and apply mulch to conserve soil moisture."
            ),
        },
        {
            "keywords": ["price", "market", "sell", "cost"],
            "response": (
                "Market prices fluctuate based on arrivals. It's often advisable to "
                "hold non-perishable commodities if current prices are below historical "
                "averages, provided you have adequate storage."
            ),
        },
    ]

    DEFAULT_RESPONSES = [
        (
            "That's an excellent question. Based on current agronomic best practices, "
            "I recommend closely monitoring the situation. If symptoms persist, a "
            "targeted intervention may be necessary."
        ),
        (
            "While specific recommendations depend on your exact local conditions, "
            "a balanced approach combining organic amendments and precise water "
            "management usually yields the best results."
        ),
        (
            "Have you considered taking a soil sample from the affected area? A "
            "detailed nutrient profile would allow me to give you a much more "
            "precise recommendation."
        ),
    ]

    message_lower = message.lower()
    for rule in RESPONSES:
        for keyword in rule["keywords"]:
            if re.search(r"\b" + keyword + r"\b", message_lower):
                return rule["response"]

    import random
    return random.choice(DEFAULT_RESPONSES)
