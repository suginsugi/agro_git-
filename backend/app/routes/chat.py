from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.chat_history import ChatHistory
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse
from app.services.chat_service import generate_chat_response

router = APIRouter(prefix="/chat", tags=["AI Assistant"])


@router.post("", response_model=ChatMessageResponse)
def send_message(request: ChatMessageRequest, db: Session = Depends(get_db)):
    farmer_id = "AGR-88219-X"
    
    # Save user message
    user_msg = ChatHistory(
        farmer_id=farmer_id,
        role="user",
        content=request.message
    )
    db.add(user_msg)
    db.flush()  # Flush so it appears in history query below
    
    # Fetch recent history for context (last 20 messages)
    history = (
        db.query(ChatHistory)
        .filter(ChatHistory.farmer_id == farmer_id)
        .order_by(ChatHistory.created_at.asc())
        .limit(20)
        .all()
    )
    
    # Generate response with conversation context
    response_content = generate_chat_response(request.message, history)
    
    # Save assistant message
    asst_msg = ChatHistory(
        farmer_id=farmer_id,
        role="assistant",
        content=response_content
    )
    db.add(asst_msg)
    db.commit()
    db.refresh(asst_msg)
    
    return asst_msg


@router.get("/history", response_model=List[ChatMessageResponse])
def get_chat_history(db: Session = Depends(get_db)):
    farmer_id = "AGR-88219-X"
    return db.query(ChatHistory).filter(ChatHistory.farmer_id == farmer_id).order_by(ChatHistory.created_at.asc()).all()
