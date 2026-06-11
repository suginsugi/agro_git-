from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.contact_message import ContactMessage
from app.schemas.contact import ContactMessageCreate, ContactMessageResponse

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("", response_model=ContactMessageResponse)
def submit_contact(msg_data: ContactMessageCreate, db: Session = Depends(get_db)):
    db_msg = ContactMessage(**msg_data.model_dump())
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg


@router.get("/messages", response_model=List[ContactMessageResponse])
def get_all_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
