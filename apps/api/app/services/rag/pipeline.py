from app.services.rag.retriever import retriever
from app.services.llm.groq_client import client


def ask_medical_question(question: str):

    small_talk = [
        "hi",
        "hello",
        "hey",
        "hii",
        "good morning",
        "good evening",
        "how are you",
        "yo"
    ]

    if question.lower().strip() in small_talk:
        return "Hello 👋 How can I help you with your health today?"

    docs = retriever.invoke(question)

    context = "\n".join(
        [doc.page_content for doc in docs]
    )

    if not context.strip():
        context = """
        General healthcare information about:
        fever, dengue, thyroid disorders,
        PCOS, diabetes, hypertension,
        infections, dizziness, nausea,
        headaches, fatigue.
        """
    prompt = f"""

You are MedIntel AI,
an intelligent and conversational healthcare assistant.

Talk naturally like ChatGPT.

Do NOT sound robotic, textbook-like, or overly formatted.

Keep responses:
- natural
- human
- conversational
- informative
- supportive

Avoid:
- too many bullet points
- excessive formatting
- overly short answers
- repetitive medical explanations

User Question:
{question}

Medical Context:
{context}

Instructions:
- Answer like a real assistant talking to a person
- Write in smooth conversational  bullet 
- USE BULLETS
- Use less emojis
- Explain clearly but naturally
- Keep answers engaging and easy to read
- Be empathetic and supportive
- If needed, gently advise seeing a doctor
- Do not overload with unnecessary details

Examples of GOOD style:

User:
"What are asthma symptoms?"

Assistant:
"Asthma symptoms usually include shortness of breath, wheezing, chest tightness, and frequent coughing — especially at night or after physical activity. Some people also feel like they can’t take a deep breath properly.

Symptoms can range from mild to severe, so if breathing becomes difficult or symptoms happen often, it’s important to speak with a doctor."

User:
"Why do I feel dizzy?"

Assistant:
"Dizziness can happen for many reasons, including dehydration, low blood sugar, stress, lack of sleep, or sometimes inner ear problems. If it happens frequently, along with chest pain, fainting, or blurred vision, it’s best to get medical advice."

Now answer naturally.
"""


    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.5,
        max_tokens=500,
    )

    return completion.choices[0].message.content

