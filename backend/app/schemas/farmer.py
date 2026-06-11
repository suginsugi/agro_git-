from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class FarmerBase(BaseModel):
    name: str
    mobile: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    land_area: Optional[str] = None
    crop_types: Optional[str] = None
    soil_type: Optional[str] = None
    irrigation_type: Optional[str] = None


class FarmerCreate(FarmerBase):
    farmer_id: str


class FarmerUpdate(FarmerBase):
    pass


class FarmerResponse(FarmerBase):
    id: int
    farmer_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
