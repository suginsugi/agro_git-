from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class DiseaseReportBase(BaseModel):
    pass


class DiseaseReportCreate(DiseaseReportBase):
    farmer_id: str
    file_path: str
    original_filename: str
    disease_name: str
    confidence: float
    severity: str
    recommendations: List[Dict[str, Any]]
    affected_area: float


class DiseaseReportResponse(DiseaseReportCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
