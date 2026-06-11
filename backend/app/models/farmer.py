from sqlalchemy import Column, Integer, String, Float, DateTime, Text, func

from app.database import Base


class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    mobile = Column(String(20))
    email = Column(String(255))
    address = Column(Text)
    farmer_id = Column(String(50), unique=True, nullable=False, index=True)
    land_area = Column(String(100))
    crop_types = Column(String(500))
    soil_type = Column(String(100))
    irrigation_type = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
