
import base64

from app.services.llm.groq_client import client


def analyze_medical_image(
    image_path
):

    # ============================================
    # CONVERT IMAGE TO BASE64
    # ============================================

    with open(
        image_path,
        "rb"
    ) as image_file:

        base64_image = base64.b64encode(
            image_file.read()
        ).decode("utf-8")

    # ============================================
    # PROMPT
    # ============================================

    prompt = """
You are MedIntel AI Vision.

Analyze the uploaded medical or health-related image carefully.

IMPORTANT:
- Do NOT diagnose with certainty
- Use cautious medical language
- Explain findings simply
- Use bullet points
- Mention when professional consultation is needed
- Keep response visually clean and readable

Format response like:

🩺 Possible Observations
• Observation 1
• Observation 2

💊 General Suggestions
• Suggestion 1
• Suggestion 2

⚠️ Seek medical care if:
• Warning sign 1
• Warning sign 2
"""

    # ============================================
    # GROQ VISION CALL
    # ============================================

    completion = client.chat.completions.create(

        model="meta-llama/llama-4-scout-17b-16e-instruct",

        messages=[

            {
                "role": "user",

                "content": [

                    {
                        "type": "text",
                        "text": prompt,
                    },

                    {
                        "type": "image_url",

                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        },
                    },
                ],
            }
        ],

        temperature=0.4,
    )

    return (
        completion
        .choices[0]
        .message
        .content
    )
