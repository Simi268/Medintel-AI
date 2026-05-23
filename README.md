# MedIntel AI

MedIntel AI is a multimodal healthcare intelligence platform powered by LLMs, RAG pipelines, and AI agents.

## Features

- Medical PDF ingestion
- Vector embeddings with Qdrant
- Healthcare-focused RAG pipeline
- Groq-powered LLM responses
- Grounded medical question answering

## Tech Stack

- FastAPI
- Groq API
- LangChain
- Qdrant
- SentenceTransformers
- Docker

## Current Status

✅ Backend architecture  
✅ PDF ingestion  
✅ Vector database integration  
✅ Retrieval-Augmented Generation (RAG)

## Run Locally

```bash
docker compose up

uvicorn app.main:app --reload
