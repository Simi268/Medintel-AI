
from fastapi import APIRouter, UploadFile, File
from pathlib import Path
import shutil

from app.services.report.report_analyzer import (
    analyze_report
)

router = APIRouter()

# ====================================================
# UPLOAD DIRECTORY
# ====================================================

UPLOAD_DIR = Path("uploads")

UPLOAD_DIR.mkdir(
    exist_ok=True
)

# ====================================================
# REPORT ANALYSIS ROUTE
# ====================================================

@router.post("/analyze")
async def analyze_medical_report(
    file: UploadFile = File(...)
):

    try:

        print("Received file:", file.filename)

        # ============================================
        # SAVE FILE
        # ============================================

        file_path = (
            UPLOAD_DIR / file.filename
        )

        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        print("Saved file:", file_path)

        # ============================================
        # ANALYZE REPORT
        # ============================================

        result = analyze_report(
            str(file_path)
        )

        print("Analysis completed")

        return {
            "analysis": result
        }

    except Exception as e:

        print("REPORT ERROR:", str(e))

        return {
            "analysis": f"Unable to analyze report. {str(e)}"
        }