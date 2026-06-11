from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.farmer import Farmer
from app.schemas.farmer import FarmerResponse, FarmerUpdate

router = APIRouter(prefix="/profile", tags=["Farmer Profile"])


@router.get("", response_model=FarmerResponse)
def get_profile(db: Session = Depends(get_db)):
    farmer_id = "AGR-88219-X"
    farmer = db.query(Farmer).filter(Farmer.farmer_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Profile not found")
    return farmer


@router.put("", response_model=FarmerResponse)
def update_profile(profile_data: FarmerUpdate, db: Session = Depends(get_db)):
    farmer_id = "AGR-88219-X"
    farmer = db.query(Farmer).filter(Farmer.farmer_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    for key, value in profile_data.model_dump(exclude_unset=True).items():
        setattr(farmer, key, value)
        
    db.commit()
    db.refresh(farmer)
    return farmer
