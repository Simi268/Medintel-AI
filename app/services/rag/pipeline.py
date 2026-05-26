from groq import Groq
from app.core.config import settings
from app.services.rag.retriever import retriever

client = Groq(api_key=settings.GROQ_API_KEY)

def ask_medical_question(question: str):

    docs = retriever.invoke(question)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
    You are MedIntel AI.

    Explain healthcare topics in simple language.

    Use the provided medical context if relevant.

    Context:
    {context}

    User Question:
    {question}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.4,
        max_tokens=700
    )

    return response.choices[0].message.content