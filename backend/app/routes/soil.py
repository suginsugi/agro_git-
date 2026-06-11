from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import shutil
import uuid
import os

from app.database import get_db
from app.models.soil_report import SoilReport
from app.schemas.soil import SoilReportResponse
from app.services.soil_service import extract_soil_data
from app.core.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/soil", tags=["Soil Analysis"])


@router.post("/upload", response_model=SoilReportResponse)
async def upload_soil_report(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Create upload dir if not exists
    upload_path = os.path.join(settings.UPLOAD_DIR, "soil")
    os.makedirs(upload_path, exist_ok=True)

    # Save file
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_location = os.path.join(upload_path, unique_filename)
    
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # Run real OCR/analysis
    analysis_data = extract_soil_data(file_location, file.filename)

    # Save to database
    db_report = SoilReport(
        farmer_id="AGR-88219-X",  # Default farmer ID
        file_path=file_location,
        original_filename=file.filename,
        **analysis_data
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return db_report


@router.get("/report/{report_id}", response_model=SoilReportResponse)
def get_soil_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(SoilReport).filter(SoilReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.get("/reports")
def get_all_reports(db: Session = Depends(get_db)):
    return db.query(SoilReport).all()
