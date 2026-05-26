from app.services.llm.groq_client import llm


def analyze_medical_report(report_text: str):

    prompt = f"""
You are MedIntel AI.

Analyze this medical report in simple language.

Explain:
1. Summary
2. Abnormal values
3. Possible health concerns
4. Recommendations

IMPORTANT:
- Be patient friendly
- Keep response concise
- Mention this is not a diagnosis

Medical Report:
{report_text}
"""

    response = llm.invoke(prompt)

    return response.content