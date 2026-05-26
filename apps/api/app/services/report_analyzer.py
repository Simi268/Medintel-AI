import re


def analyze_report(text: str):

    response = []

    text_lower = text.lower()

    # Hemoglobin
    hb_match = re.search(
        r"hemoglobin[:\s]+([\d.]+)",
        text_lower
    )

    if hb_match:

        hb = float(hb_match.group(1))

        if hb < 12:
            response.append(
                f"""
🩸 Hemoglobin: {hb} g/dL

This value is lower than normal.

Possible reasons:
- Iron deficiency
- Anemia
- Poor nutrition
- Blood loss

Common symptoms:
- Weakness
- Fatigue
- Dizziness
- Pale skin
"""
            )

        else:
            response.append(
                f"""
🩸 Hemoglobin: {hb} g/dL

This value appears within the healthy range.
"""
            )

    # Blood Sugar
    sugar_match = re.search(
        r"blood sugar[:\s]+([\d.]+)",
        text_lower
    )

    if sugar_match:

        sugar = float(sugar_match.group(1))

        if sugar > 140:
            response.append(
                f"""
🍬 Blood Sugar: {sugar} mg/dL

This value is higher than normal.

Possible concerns:
- Diabetes risk
- High glucose levels
- Diet-related sugar spike

Suggestions:
- Reduce sugary foods
- Exercise regularly
- Monitor glucose levels
"""
            )

        else:
            response.append(
                f"""
🍬 Blood Sugar: {sugar} mg/dL

Blood sugar appears normal.
"""
            )

    # Cholesterol
    chol_match = re.search(
        r"cholesterol[:\s]+([\d.]+)",
        text_lower
    )

    if chol_match:

        chol = float(chol_match.group(1))

        if chol > 200:
            response.append(
                f"""
❤️ Cholesterol: {chol} mg/dL

Cholesterol appears elevated.

Possible risks:
- Heart disease
- Blood vessel blockage
- High blood pressure

Lifestyle tips:
- Reduce oily food
- Exercise regularly
- Increase fiber intake
"""
            )

        else:
            response.append(
                f"""
❤️ Cholesterol: {chol} mg/dL

Cholesterol appears healthy.
"""
            )

    # WBC
    wbc_match = re.search(
        r"wbc[:\s]+([\d.]+)",
        text_lower
    )

    if wbc_match:

        wbc = float(wbc_match.group(1))

        if wbc > 11000:
            response.append(
                f"""
🦠 WBC Count: {wbc}

WBC count appears elevated.

Possible causes:
- Infection
- Inflammation
- Fever
- Immune response
"""
            )

        else:
            response.append(
                f"""
🦠 WBC Count: {wbc}

WBC count appears normal.
"""
            )

    # Fallback
    if not response:

        response.append(
            """
⚠️ Unable to detect major medical values in the uploaded report.

Try uploading:
- CBC reports
- Blood test reports
- Cholesterol reports
- Diabetes reports
"""
        )

    # Safety Note
    response.append(
        """
━━━━━━━━━━━━━━━

⚠️ IMPORTANT:
This AI-generated analysis is for educational purposes only and should not replace professional medical advice.
"""
    )

    return "\n".join(response)