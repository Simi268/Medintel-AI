import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

DATA_PATH = "data/medical_pdfs"

documents = []

for file in os.listdir(DATA_PATH):

    if file.endswith(".pdf"):

        path = os.path.join(DATA_PATH, file)

        print(f"Loading: {file}")

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