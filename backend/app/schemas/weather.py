from pydantic import BaseModel
from typing import Any, Dict, Optional
from datetime import datetime


class WeatherCacheBase(BaseModel):
    location: str
    latitude: float
    longitude: float
    data: Dict[str, Any]
    forecast_data: Dict[str, Any]


class WeatherCacheCreate(WeatherCacheBase):
    pass


class WeatherCacheResponse(WeatherCacheBase):
    id: int
    fetched_at: datetime

    class Config:
        from_attributes = True
