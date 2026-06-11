from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserSettingsBase(BaseModel):
    theme: Optional[str] = "system"
    font_size: Optional[str] = "Medium (Default)"
    dashboard_density: Optional[str] = "Comfortable"
    language: Optional[str] = "English (US)"
    region: Optional[str] = "India"
    timezone: Optional[str] = "(UTC+05:30) IST"
    weather_alerts: Optional[bool] = True
    disease_alerts: Optional[bool] = True
    market_alerts: Optional[bool] = True
    export_preference: Optional[str] = "Monthly Detailed Report"
    download_format: Optional[str] = "PDF"


class UserSettingsUpdate(UserSettingsBase):
    pass


class UserSettingsResponse(UserSettingsBase):
    id: int
    farmer_id: str
    updated_at: datetime

    class Config:
        from_attributes = True
