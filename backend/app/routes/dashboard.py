from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.soil_report import SoilReport
from app.models.disease_report import DiseaseReport
from app.services.weather_service import get_weather_data
from app.core.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("")
async def get_dashboard(db: Session = Depends(get_db)):
    farmer_id = "AGR-88219-X"
    
    # Aggregate data from different modules
    
    # 1. Recent soil health
    latest_soil = db.query(SoilReport).filter(SoilReport.farmer_id == farmer_id).order_by(SoilReport.created_at.desc()).first()
    soil_health = latest_soil.soil_health if latest_soil else 88.0
    
    # 2. Disease alerts count
    disease_alerts_count = db.query(DiseaseReport).filter(
        DiseaseReport.farmer_id == farmer_id,
        DiseaseReport.severity == 'High'
    ).count()
    
    # 3. Weather snippet
    weather_data = await get_weather_data(db, settings.DEFAULT_LATITUDE, settings.DEFAULT_LONGITUDE, settings.DEFAULT_LOCATION)
    current_weather = weather_data.get("current", {})
    
    # Combine
    return {
        "summary": {
            "totalArea": "500",
            "activeCrops": 3,
            "soilHealthAvg": soil_health,
            "diseaseAlerts": disease_alerts_count,
            "yieldForecast": "+12%",
            "irrigationStatus": "Optimized"
        },
        "weather": {
            "temperature": current_weather.get("temperature", 0),
            "condition": "Partly Cloudy" # Mock mapping
        }
    }
