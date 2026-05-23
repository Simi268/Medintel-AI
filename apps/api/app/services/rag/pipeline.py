from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from app.services.llm.groq_client import client

COLLECTION_NAME = "medical_docs"

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vector_store = QdrantVectorStore.from_existing_collection(
    embedding=embeddings,
    url="http://localhost:6333",
    collection_name=COLLECTION_NAME,
)


def ask_medical_question(question: str):

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 3}
    )

    docs = retriever.invoke(question)

    context = "\n\n".join(
    [doc.page_content.replace("\n", " ") for doc in docs]
    )


    prompt = f"""
You are MedIntel AI, a healthcare research assistant.

Answer the question ONLY using the provided medical context.

Context:
{context}

Question:
{question}

Answer:
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
    )

    answer = completion.choices[0].message.content

    sources = []


    for i, doc in enumerate(docs):
        sources.append({
    "chunk": i + 1,
    "source": doc.metadata.get("source"),
    "page": doc.metadata.get("page"),
    "content": doc.page_content[:300].replace("\n", " ")
})

    return {
    "answer": answer,
    "sources": sources
    }
