from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag.pipeline import ask_medical_question
from app.services.llm.groq_client import client

router = APIRouter()


# =====================================================
# REQUEST MODELS
# =====================================================

class QuestionRequest(BaseModel):

    question: str


class DrugRequest(BaseModel):

    drug: str


class ReportRequest(BaseModel):

    report_text: str


# =====================================================
# ASK MEDICAL QUESTION
# =====================================================

@router.post("/ask")

async def ask_rag(

    request: QuestionRequest

):

    response = ask_medical_question(

        request.question

    )

    return {

        "response": response
    }


# =====================================================
# DRUG CHECKER
# =====================================================

@router.post("/drug-check")

async def drug_check(

    request: DrugRequest

):

    prompt = f"""

You are MedIntel AI — a smart and patient-friendly healthcare assistant.

Explain this medication in very simple language.

Medication:
{request.drug}

Include:

- What it is used for
- Common side effects
- Safety precautions
- Interaction warnings
- Important advice patients should know

Keep the explanation:
- warm
- conversational
- easy to understand
- medically safe

Use occasional emojis naturally 💊🩺

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

        max_tokens=600,
    )

    return {

        "response": completion.choices[0].message.content
    }


# =====================================================
# REPORT ANALYZER
# =====================================================

@router.post("/analyze-report")

async def analyze_report(

    request: ReportRequest

):

    prompt = f"""

You are MedIntel AI — a patient-friendly healthcare assistant.

Explain this medical report in VERY SIMPLE language.

Report:
{request.report_text}

Explain:

1. What each value means
2. Whether it is normal or abnormal
3. Possible causes
4. Symptoms patient may notice
5. Lifestyle recommendations
6. When doctor consultation may be needed

Rules:

- Use simple language
- Avoid medical jargon
- Keep responses supportive
- Use modern conversational tone
- Use occasional emojis naturally 🩺💜
- Avoid robotic responses

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

        max_tokens=800,
    )

    return {

        "response": completion.choices[0].message.content
    }
