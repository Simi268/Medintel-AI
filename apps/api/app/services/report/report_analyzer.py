import re
import os
import pytesseract
import cv2
import fitz

from pathlib import Path
from pdf2image import convert_from_path

from app.services.llm.groq_client import client


# ====================================================
# TESSERACT
# ====================================================

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

# ====================================================
# POPPLER
# ====================================================

POPPLER_PATH = (
    r"C:\Users\simi\Downloads\Release-26.02.0-0\poppler-26.02.0\Library\bin"
)

os.environ["PATH"] += os.pathsep + POPPLER_PATH


# ====================================================
# TEXT EXTRACTION
# ====================================================

def extract_text_from_file(
    file_path: str
):

    path = Path(file_path)

    ext = path.suffix.lower()

    full_text = ""

    # =================================================
    # PDF
    # =================================================

    if ext == ".pdf":

        try:

            doc = fitz.open(file_path)

            extracted_text = ""

            for page in doc:

                extracted_text += page.get_text()

            doc.close()

            if extracted_text.strip():

                full_text += extracted_text

            else:

                pages = convert_from_path(
                    file_path,
                    poppler_path=POPPLER_PATH
                )

                for page in pages:

                    text = pytesseract.image_to_string(
                        page
                    )

                    full_text += "\n" + text

        except Exception as e:

            print("PDF ERROR:", e)

    # =================================================
    # IMAGE
    # =================================================

    elif ext in [
        ".png",
        ".jpg",
        ".jpeg"
    ]:

        image = cv2.imread(file_path)

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        text = pytesseract.image_to_string(
            gray
        )

        full_text += text

    # =================================================
    # TXT
    # =================================================

    elif ext == ".txt":

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as f:

            full_text = f.read()

    return full_text
# ====================================================
# REPORT ANALYSIS
# ====================================================

def analyze_report(
    file_path: str
):

    text = extract_text_from_file(
        file_path
    )

    text_lower = text.lower()

    print("\n========== REPORT TEXT ==========")
    print(text_lower)
    print("=================================\n")

    # =================================================
    # EMPTY TEXT CHECK
    # =================================================

    if not text.strip():

        return (
            "⚠️ Unable to extract readable text from the uploaded report."
        )

    # =================================================
    # STRUCTURED MEDICAL DATA
    # =================================================

    medical_data = {}

    patterns = {

        "Blood Pressure":
        r"blood\s+pressure.*?(\d+/\d+)",

        "Heart Rate":
        r"heart\s+rate.*?([\d.]+)",

        "Total Cholesterol":
        r"total\s+cholesterol.*?([\d.]+)",

        "LDL Cholesterol":
        r"ldl.*?([\d.]+)",

        "HDL Cholesterol":
        r"hdl.*?([\d.]+)",

        "Triglycerides":
        r"triglycerides.*?([\d.]+)",

        "Troponin":
        r"troponin.*?([\d.]+)",

        "Hemoglobin":
        r"hemoglobin.*?([\d.]+)",

        "Blood Sugar":
        r"(blood\s+sugar|glucose).*?([\d.]+)",

        "HbA1c":
        r"hba1c.*?([\d.]+)",

        "WBC":
        r"wbc.*?([\d,]+)",

        "Platelets":
        r"platelet.*?([\d,]+)",

        "RBC":
        r"rbc.*?([\d.]+)",

        "Creatinine":
        r"creatinine.*?([\d.]+)",

        "Urea":
        r"urea.*?([\d.]+)",

        "Bilirubin":
        r"bilirubin.*?([\d.]+)",
    }

    # =================================================
    # EXTRACT VALUES
    # =================================================

    for key, pattern in patterns.items():

        match = re.search(
            pattern,
            text_lower,
            re.DOTALL
        )

        if match:

            value = match.groups()[-1]

            medical_data[key] = value

    # =================================================
    # AI PROMPT
    # =================================================

    prompt = f"""
You are MedIntel AI.

You are an advanced AI healthcare assistant.

Analyze the following medical report.

The report may include:
- blood reports
- radiology reports
- diabetes reports
- prescriptions
- scan reports
- discharge summaries
- pathology reports
- medical observations

Your task:
- explain findings in very simple and warm language
- identify possible abnormalities
- mention important medical concerns
- explain risks carefully
- provide lifestyle suggestions
- recommend when doctor consultation is needed
- summarize clearly pointwise
- sound warm and caring
- avoid robotic tone
- use short readable sections
- use bullet points
- use emojis
- avoid medical jargon whenever possible

Structured Medical Data:
{medical_data}

Full Extracted Report Text:
{text[:12000]}

Response Format:

## Quick Summary

## Important Findings

## Possible Concerns

## Recommendations

## When To See A Doctor

End with:

"This explanation is educational and not a replacement for professional medical advice."
"""

    # =================================================
    # GROQ AI
    # =================================================

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],

        temperature=0.5,
    )

    return completion.choices[0].message.content
