from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.services.weather_service import get_weather_data
from app.core.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/weather", tags=["Weather Intelligence"])


@router.get("/current")
async def get_current_weather(
    lat: Optional[float] = None, 
    lon: Optional[float] = None, 
    location: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get current weather. Uses default location if lat/lon not provided.
    """
    latitude = lat if lat is not None else settings.DEFAULT_LATITUDE
    longitude = lon if lon is not None else settings.DEFAULT_LONGITUDE
    loc_name = location if location else settings.DEFAULT_LOCATION
    
    data = await get_weather_data(db, latitude, longitude, loc_name)
    
    # Format current weather according to frontend expectations
    current = data.get("current", {})
    return {
        "temperature": current.get("temperature", 0),
        "humidity": current.get("relative_humidity_2m", 60), # Fallback if API changed
        "windSpeed": current.get("windspeed", 0),
        "weathercode": current.get("weathercode", 0),
        "winddirection": current.get("winddirection", 0),
        "time": current.get("time", "")
    }


@router.get("/forecast")
async def get_forecast(
    lat: Optional[float] = None, 
    lon: Optional[float] = None, 
    location: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get 7-day forecast and hourly forecast.
    """
    latitude = lat if lat is not None else settings.DEFAULT_LATITUDE
    longitude = lon if lon is not None else settings.DEFAULT_LONGITUDE
    loc_name = location if location else settings.DEFAULT_LOCATION
    
    data = await get_weather_data(db, latitude, longitude, loc_name)
    return data.get("forecast", {})
