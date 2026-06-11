from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class SoilReportBase(BaseModel):
    pass


class SoilReportCreate(SoilReportBase):
    farmer_id: str
    file_path: str
    original_filename: str
    soil_health: float
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    moisture: float
    recommended_crop: str
    fertility: str
    recommendations: List[str]


class SoilReportResponse(SoilReportCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
