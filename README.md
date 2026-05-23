# MedIntel AI

MedIntel AI is a healthcare-focused RAG (Retrieval-Augmented Generation) platform that allows users to upload medical PDFs, ingest them into a vector database, and ask grounded medical questions using LLMs.

## Features

- Medical PDF ingestion
- Semantic vector search with Qdrant
- Groq-powered medical QA
- FastAPI backend
- Metadata-aware source citations
- PDF upload endpoint
- RAG pipeline for grounded responses

## Tech Stack

- FastAPI
- LangChain
- Groq API
- Qdrant
- Python
- Docker

## API Endpoints

### Ask Questions

```http
POST /rag/ask
````

### Upload PDFs

```http
POST /rag/upload
```

## Run Locally

### Clone Repository

```bash
git clone https://github.com/Simi268/Medintel-AI.git
```

### Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Qdrant

```bash
docker compose up
```

### Start Backend

```bash
cd apps/api
uvicorn app.main:app --reload
```

## API Docs

```text
http://127.0.0.1:8000/docs
```

## Current Status

* Backend complete
* RAG pipeline working
* PDF ingestion working
* Metadata-aware retrieval implemented
* Frontend in progress

## Upcoming Features

* React frontend
* Chat interface
* Drag-and-drop uploads
* Conversational memory
* Better citations
* Multi-document retrieval

## Author

Built by Simi268


