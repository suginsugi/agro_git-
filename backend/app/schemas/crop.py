from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CropImageBase(BaseModel):
    pass


class CropImageCreate(CropImageBase):
    farmer_id: str
    field_id: str
    field_name: str
    crop_name: str
    image_path: str
    image_url: str
    health_score: float
    ndvi: float
    growth_stage: str
    recommendation: str


class CropImageResponse(CropImageCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
