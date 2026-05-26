import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
<<<<<<< HEAD
from langchain_community.vectorstores import Chroma
=======
from langchain_qdrant import QdrantVectorStore
from pathlib import Path

>>>>>>> ef49774c79facf4fad35876bdad51868c3c742f8

DATA_PATH = "data/medical_pdfs"

documents = []

for file in os.listdir(DATA_PATH):

    if file.endswith(".pdf"):

        path = os.path.join(DATA_PATH, file)

<<<<<<< HEAD
        print(f"Loading: {file}")
=======
    chunks = splitter.split_documents(docs)
    filename = Path(pdf_path).name
    for chunk in chunks:
        chunk.metadata["source"] = filename
        if "page" in chunk.metadata:
            chunk.metadata["page"] = chunk.metadata["page"] + 1
>>>>>>> ef49774c79facf4fad35876bdad51868c3c742f8

        loader = PyPDFLoader(path)

        pdf_docs = loader.load()

        documents.extend(pdf_docs)

print(f"Loaded {len(documents)} pages")

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

docs = splitter.split_documents(documents)

print(f"Created {len(docs)} chunks")

docs = [doc for doc in docs if doc.page_content.strip()]

print(f"Valid chunks: {len(docs)}")

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=embedding_model,
    persist_directory="./chroma_db"
)

print("SUCCESS: Medical PDFs ingested into ChromaDB")