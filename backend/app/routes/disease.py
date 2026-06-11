from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import shutil
import uuid
import os

from app.database import get_db
from app.models.disease_report import DiseaseReport
from app.schemas.disease import DiseaseReportResponse
from app.services.disease_service import analyze_disease as run_disease_analysis
from app.core.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/disease", tags=["Disease Detection"])


@router.post("/analyze", response_model=DiseaseReportResponse)
async def analyze_disease(file: UploadFile = File(...), db: Session = Depends(get_db)):
    upload_path = os.path.join(settings.UPLOAD_DIR, "disease")
    os.makedirs(upload_path, exist_ok=True)

    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_location = os.path.join(upload_path, unique_filename)
    
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # Run real ML/AI analysis
    analysis_data = run_disease_analysis(file_location, file.filename)

    db_report = DiseaseReport(
        farmer_id="AGR-88219-X",
        file_path=file_location,
        original_filename=file.filename,
        **analysis_data
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return db_report


@router.get("/result/{report_id}", response_model=DiseaseReportResponse)
def get_disease_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(DiseaseReport).filter(DiseaseReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.get("/reports")
def get_all_disease_reports(db: Session = Depends(get_db)):
    return db.query(DiseaseReport).order_by(DiseaseReport.created_at.desc()).all()
