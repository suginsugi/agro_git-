from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user_settings import UserSettings
from app.schemas.settings import UserSettingsResponse, UserSettingsUpdate

router = APIRouter(prefix="/settings", tags=["Settings"])


@router.get("", response_model=UserSettingsResponse)
def get_settings(db: Session = Depends(get_db)):
    farmer_id = "AGR-88219-X"
    settings = db.query(UserSettings).filter(UserSettings.farmer_id == farmer_id).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings


@router.put("", response_model=UserSettingsResponse)
def update_settings(settings_data: UserSettingsUpdate, db: Session = Depends(get_db)):
    farmer_id = "AGR-88219-X"
    settings = db.query(UserSettings).filter(UserSettings.farmer_id == farmer_id).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
        
    for key, value in settings_data.model_dump(exclude_unset=True).items():
        setattr(settings, key, value)
        
    db.commit()
    db.refresh(settings)
    return settings
