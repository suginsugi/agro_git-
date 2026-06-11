from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON, func

from app.database import Base


class DiseaseReport(Base):
    __tablename__ = "disease_reports"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(String(50), index=True)
    file_path = Column(String(500))
    original_filename = Column(String(255))
    disease_name = Column(String(200))
    confidence = Column(Float)
    severity = Column(String(50))
    recommendations = Column(JSON)
    affected_area = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
