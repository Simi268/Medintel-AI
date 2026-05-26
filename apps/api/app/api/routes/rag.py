from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
<<<<<<< HEAD
from app.services.rag.pipeline import ask_medical_question
from app.services.llm.groq_client import client
=======

from pathlib import Path
import shutil

from app.services.rag.pipeline import ask_medical_question
from app.services.rag.ingest import ingest_pdf
>>>>>>> ef49774c79facf4fad35876bdad51868c3c742f8

router = APIRouter()

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




class QuestionRequest(BaseModel):
    question: str


class DrugRequest(BaseModel):
    drug: str


class ReportRequest(BaseModel):
    report_text: str


@router.post("/ask")
async def ask_rag(request: QuestionRequest):

    try:

        response = ask_medical_question(
            request.question
        )

        return {
            "response": response
        }

    except Exception as e:

        return {
            "response":
            f"Backend Error: {str(e)}"
        }


@router.post("/drug-check")
async def drug_check(request: DrugRequest):

    prompt = f"""
    Explain this medication in simple patient-friendly language.

    Medication:
    {request.drug}

    Include:
    - What it is used for
    - Common side effects
    - Safety precautions
    - Interaction warnings
    """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return {
        "response": completion.choices[0].message.content
    }


@router.post("/analyze-report")
async def analyze_report(request: ReportRequest):

    prompt = f"""
    You are a patient-friendly AI healthcare assistant.

    Explain this medical report in VERY SIMPLE language.

    Report:
    {request.report_text}

    Format:

    1. What each value means
    2. Whether it is normal or abnormal
    3. Possible causes
    4. Symptoms patient may notice
    5. Lifestyle recommendations
    6. When to consult a doctor

    Make it easy for non-medical users.
    """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return {
        "response": completion.choices[0].message.content
    }