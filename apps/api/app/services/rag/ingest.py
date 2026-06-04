from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.db.vectorstore import vectorstore


def ingest_pdf(file_path: str):

    print(f"Loading PDF: {file_path}")

    # Load PDF
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    print(f"Loaded {len(documents)} pages")

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(documents)

    print(f"Created {len(chunks)} chunks")

    # Store in vector DB
    vectorstore.add_documents(chunks)

    print("SUCCESS: PDF ingested into ChromaDB")