from app.services.rag.retriever import retriever
from app.services.llm.groq_client import client
from app.models.chat import Message


def ask_medical_question(
    question,
    language="English",
    conversation_id=None,
    db=None
):
    # =====================================================
    # SMALL TALK
    # =====================================================

    small_talk = [
        "hi",
        "hello",
        "hey",
        "hii",
        "good morning",
        "good evening",
        "how are you"
    ]

    if question.lower().strip() in small_talk:
        return (
            "Hey there 👋\n\n"
            "I’m MedIntel AI — your smart healthcare assistant.\n\n"
            "You can ask me about:\n"
            "• symptoms 🤒\n"
            "• medicines 💊\n"
            "• medical reports 🩺\n"
            "• fitness 🏃\n"
            "• wellness 💜"
        )

    # =====================================================
    # RETRIEVE CONTEXT
    # =====================================================

    docs = retriever.invoke(question[:300])

    # =====================================================
    # FILTER RELEVANT DOCS
    # =====================================================

    filtered_docs = []

    for doc in docs:
        content = doc.page_content.lower()

        if any(
            keyword in content
            for keyword in question.lower().split()
        ):
            filtered_docs.append(doc)

    # =====================================================
    # BUILD CONTEXT
    # =====================================================

    context = "\n".join(
        [doc.page_content for doc in filtered_docs[:4]]
    )

    # =====================================================
    # CONVERSATION MEMORY
    # =====================================================

    previous_messages = []

    if conversation_id and db:
        previous_messages = (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .all()
        )

    # =====================================================
    # FALLBACK CONTEXT
    # =====================================================

    if not context.strip():
        context = """
        General healthcare information about:

        fever,
        dengue,
        thyroid disorders,
        PCOS,
        diabetes,
        hypertension,
        infections,
        dizziness,
        nausea,
        headaches,
        fatigue,
        allergies,
        fractures,
        viral infections,
        burns,
        skin conditions,
        chest pain.
        """

    # =====================================================
    # AI PROMPT
    # =====================================================

    prompt = f"""
You are MedIntel AI — a smart, modern, emotionally intelligent healthcare assistant.

Answer in {language} language.

Your personality should feel:
- warm
- supportive
- conversational
- intelligent
- calm
- human-like

You should sound like:
- a premium AI healthcare assistant
- a caring medical guide
- a smart health companion

DO NOT sound like:
- a textbook
- Wikipedia
- a medical journal
- a robotic chatbot
- a hospital discharge summary

=====================================================
RESPONSE STYLE
=====================================================

- Write naturally like ChatGPT Premium.
- Use clean spacing between ideas.
- Use occasional relevant emojis naturally 🤒💜🩺
- Keep the tone modern and friendly.
- Avoid huge walls of text.
- Avoid excessive markdown formatting.
- DO NOT use headings like ### or ##.
- DO NOT overuse bullet points.
- Keep bullet points short and readable.
- Explain medical ideas in simple language.
- Keep responses emotionally supportive.

=====================================================
MEDICAL RESPONSE GUIDELINES
=====================================================

- Explain symptoms clearly.
- Mention possible causes.
- Mention associated symptoms to monitor.
- Explain warning signs calmly.
- Suggest practical self-care tips.
- Mention when professional medical help may be needed.
- Never claim a diagnosis with certainty.
- Avoid fear-inducing language.

=====================================================
FOLLOW-UP QUESTION HANDLING
=====================================================

If the user asks follow-up questions like:
- "what should I do?"
- "what medicine?"
- "home remedy?"
- "is this dangerous?"
- "can I apply anything?"
- "what ointment should I use?"

Use the earlier medical context and continue the conversation naturally.

=====================================================
RESPONSE LENGTH
=====================================================

- Usually between 150–350 words.
- Short questions can have shorter answers.
- Serious medical concerns can have more detailed explanations.
- Avoid repetitive explanations.

=====================================================
AVOID THESE AI PHRASES
=====================================================

DO NOT say:
- "Certainly!"
- "I'd be happy to help!"
- "As an AI..."
- "It is important to note..."

=====================================================
GOOD RESPONSE STYLE EXAMPLE
=====================================================

"Dengue symptoms usually begin with high fever, body pain, weakness, and severe headaches 🤒.

Some people also notice:
• joint pain
• skin rash
• nausea
• pain behind the eyes

Since dengue can sometimes affect platelet levels, staying hydrated and monitoring symptoms is really important 💜

If you notice breathing difficulty, persistent vomiting, bleeding, or extreme weakness, medical attention is recommended."

=====================================================

Question:
{question}

Medical Context:
{context}
"""

    # =====================================================
    # LLM MESSAGES
    # =====================================================

    messages = [
        {
            "role": "system",
            "content": prompt
        }
    ]

    # OLD CHAT HISTORY

    for msg in previous_messages:
        messages.append({
            "role": msg.role,
            "content": msg.content
        })

    # CURRENT QUESTION

    messages.append({
        "role": "user",
        "content": question
    })

    # =====================================================
    # LLM CALL
    # =====================================================

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.7,
        max_tokens=700,
    )

    return completion.choices[0].message.content