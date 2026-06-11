from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ChatMessageRequest(BaseModel):
    message: str


class ChatMessageResponse(BaseModel):
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True
