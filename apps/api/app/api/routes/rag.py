from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from pathlib import Path
import shutil

from app.services.rag.pipeline import ask_medical_question
from app.services.rag.ingest import ingest_pdf

router = APIRouter(
    prefix="/rag",
    tags=["RAG"]
)

# =========================
# Request Schema
# =========================

class RAGRequest(BaseModel):
    question: str


# =========================
# Upload Directory
# =========================

UPLOAD_DIR = Path("data/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


# =========================
# Ask Medical Questions
# =========================

@router.post("/ask")
async def ask_rag(request: RAGRequest):

    response = ask_medical_question(
        request.question
    )

    return response


# =========================
# Upload + Ingest PDFs
# =========================

@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    # Validate PDF
    if not file.filename.endswith(".pdf"):
        return {
            "error": "Only PDF files are allowed"
        }

    # Save file
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Ingest into Qdrant
    ingest_pdf(str(file_path))

    return {
        "message": "PDF uploaded and ingested successfully",
        "filename": file.filename
    }




class RAGRequest(BaseModel):
    question: str


@router.post("/ask")
async def ask_rag(request: RAGRequest):

    response = ask_medical_question(
        request.question
    )

    return response