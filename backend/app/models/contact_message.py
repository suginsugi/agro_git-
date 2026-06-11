from sqlalchemy import Column, Integer, String, DateTime, Text, func

from app.database import Base


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    mobile = Column(String(20))
    subject = Column(String(500))
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
