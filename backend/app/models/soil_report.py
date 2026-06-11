from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON, func

from app.database import Base


class SoilReport(Base):
    __tablename__ = "soil_reports"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(String(50), index=True)
    file_path = Column(String(500))
    original_filename = Column(String(255))
    soil_health = Column(Float)
    ph = Column(Float)
    nitrogen = Column(Float)
    phosphorus = Column(Float)
    potassium = Column(Float)
    moisture = Column(Float)
    recommended_crop = Column(String(100))
    fertility = Column(String(50))
    recommendations = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
