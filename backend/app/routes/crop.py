from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
import shutil
import uuid
import os

from app.database import get_db
from app.models.crop_image import CropImage
from app.schemas.crop import CropImageResponse
from app.services.crop_service import analyze_crop_image
from app.core.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/crop", tags=["Crop Analysis"])


@router.post("/upload-image", response_model=CropImageResponse)
async def upload_crop_image(
    field_id: str = Form(...),
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    upload_path = os.path.join(settings.UPLOAD_DIR, "crop")
    os.makedirs(upload_path, exist_ok=True)

    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_location = os.path.join(upload_path, unique_filename)
    
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
        
    # Real image analysis using Gemini
    analysis_data = analyze_crop_image(file_location, file.filename, field_id)

    db_image = CropImage(
        farmer_id="AGR-88219-X",
        field_id=field_id,
        field_name=f"Block {field_id[-1]}",
        crop_name=analysis_data.get("crop_name", "Unknown"),
        image_path=file_location,
        image_url=f"/uploads/crop/{unique_filename}",
        health_score=analysis_data.get("health_score", 0.0),
        ndvi=analysis_data.get("ndvi", 0.0),
        growth_stage=analysis_data.get("growth_stage", "Unknown"),
        recommendation=analysis_data.get("recommendation", "N/A")
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)

    return db_image


@router.get("/fields")
def get_all_fields(db: Session = Depends(get_db)):
    return db.query(CropImage).all()


@router.get("/{field_id}")
def get_crop_data(field_id: str, db: Session = Depends(get_db)):
    # Get latest image for this field
    image = db.query(CropImage).filter(CropImage.field_id == field_id).order_by(CropImage.created_at.desc()).first()
    if not image:
        raise HTTPException(status_code=404, detail="No data found for this field")
    return image
