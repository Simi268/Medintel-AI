from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
import os

DATA_PATH = "data"

documents = []

for file in os.listdir(DATA_PATH):

    if file.endswith(".pdf"):

        loader = PyPDFLoader(
            os.path.join(DATA_PATH, file)
        )

        documents.extend(loader.load())

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

docs = splitter.split_documents(documents)

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma.from_documents(
    docs,
    embedding_model,
    persist_directory="./chroma_db"
)

print("Medical PDFs ingested successfully")