
from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag.pipeline import (
    ask_medical_question
)

from app.services.llm.groq_client import (
    client
)

router = APIRouter()

# ====================================================
# REQUEST MODELS
# ====================================================

class QuestionRequest(BaseModel):
    question: str
    language: str = "English"
    conversation_id: int | None = None


class DrugRequest(BaseModel):
    drug: str


# ====================================================
# CHAT ROUTE
# ====================================================

from sqlalchemy.orm import Session
from fastapi import Depends

from app.db.database import SessionLocal


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/ask")
async def ask_rag(
    request: QuestionRequest,
    db: Session = Depends(get_db)
):

    response = ask_medical_question(

        question=request.question,

        language=request.language,

        conversation_id=request.conversation_id,

        db=db

    )

    return {
        "response": response
    }


# ====================================================
# DRUG INTERACTION CHECKER
# ====================================================

@router.post("/drug-check")
async def drug_check(
    request: DrugRequest
):

    prompt = f"""
You are MedIntel AI.

You are a smart AI healthcare assistant.

Explain these medicines in:
- simple language
- warm tone
- patient-friendly style

Medicines:
{request.drug}

Explain:
1. What these medicines are used for
2. Whether this combination is safe
3. Common side effects
4. Important precautions
5. Best time to take them
6. When doctor consultation is needed

Rules:
- Use bullet points
- Keep response visually pleasant
- Avoid robotic medical jargon
- Sound modern and conversational
- Use emojis moderately
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.7,
    )

    return {
        "response":
        completion.choices[0].message.content
    }
