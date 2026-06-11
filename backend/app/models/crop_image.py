from sqlalchemy import Column, Integer, String, Float, DateTime, Text, func

from app.database import Base


class CropImage(Base):
    __tablename__ = "crop_images"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(String(50), index=True)
    field_id = Column(String(20), index=True)
    field_name = Column(String(100))
    crop_name = Column(String(100))
    image_path = Column(String(500))
    image_url = Column(String(500))
    health_score = Column(Float)
    ndvi = Column(Float)
    growth_stage = Column(String(100))
    recommendation = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
