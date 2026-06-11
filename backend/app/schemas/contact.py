from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    mobile: Optional[str] = None
    subject: Optional[str] = None
    message: str


class ContactMessageResponse(ContactMessageCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
