
import os
import shutil

from fastapi import (
    APIRouter,
    UploadFile,
    File,
)

from app.services.vision.vision_analyzer import (
    analyze_medical_image
)

router = APIRouter()

# =================================================
# VISION ANALYSIS ROUTE
# =================================================

@router.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...)
):

    # =============================================
    # CREATE TEMP DIRECTORY
    # =============================================

    os.makedirs(
        "temp",
        exist_ok=True
    )

    # =============================================
    # SAVE IMAGE
    # =============================================

    temp_path = (
        f"temp/{file.filename}"
    )

    with open(
        temp_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    # =============================================
    # ANALYZE IMAGE
    # =============================================

    response = analyze_medical_image(
        temp_path
    )

    # =============================================
    # DELETE TEMP FILE
    # =============================================

    if os.path.exists(temp_path):

        os.remove(temp_path)

    # =============================================
    # RETURN RESPONSE
    # =============================================

    return {
        "response": response
    }
