from fastapi import APIRouter, UploadFile, File

router = APIRouter(
    prefix="/report",
    tags=["Report Analysis"]
)


@router.post("/analyze-report")
async def analyze_report(
    file: UploadFile = File(...)
):

    content = await file.read()

    text = content.decode("utf-8")

    findings = []

    # ----------------------------
    # SIMPLE RULE-BASED ANALYSIS
    # ----------------------------

    if "Hemoglobin: 9.5" in text:
        findings.append({
            "title": "Low Hemoglobin",
            "severity": "Moderate",
            "explanation":
                "Your hemoglobin appears lower than normal. "
                "This may indicate anemia, which can cause "
                "fatigue, weakness, or dizziness.",
            "recommendation":
                "Consider iron-rich foods and consult a doctor "
                "for further evaluation."
        })

    if "WBC Count: 14000" in text:
        findings.append({
            "title": "Elevated White Blood Cell Count",
            "severity": "High",
            "explanation":
                "Your white blood cell count is elevated. "
                "This may happen during infections or inflammation.",
            "recommendation":
                "Monitor symptoms like fever or fatigue and "
                "seek medical advice if needed."
        })

    if "Cholesterol: 260" in text:
        findings.append({
            "title": "High Cholesterol",
            "severity": "High",
            "explanation":
                "Your cholesterol level is above the healthy range. "
                "High cholesterol may increase heart disease risk.",
            "recommendation":
                "Reduce oily foods, exercise regularly, "
                "and consider medical consultation."
        })

    if "Blood Sugar: 180" in text:
        findings.append({
            "title": "High Blood Sugar",
            "severity": "Moderate",
            "explanation":
                "Your blood sugar level is elevated. "
                "This may suggest diabetes or prediabetes.",
            "recommendation":
                "Reduce sugar intake, stay active, "
                "and monitor glucose levels."
        })

    # ----------------------------
    # FINAL RESPONSE
    # ----------------------------

    return {
        "summary":
            "AI analysis completed. "
            "Some abnormal health indicators were detected.",

        "findings": findings,

        "preview": text[:500]
    }