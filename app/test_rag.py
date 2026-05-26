from app.services.rag.pipeline import ask_medical_question

response = ask_medical_question(
    "What drugs are recommended for hypertension treatment?"
)

print("\nANSWER:\n")
print(response["answer"])

print("\nSOURCES:\n")

for source in response["sources"]:
    print(f"\nChunk {source['chunk']}:\n")
    print(source["content"])