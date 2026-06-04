# 🩺 MedIntel AI

MedIntel AI is a modern AI-powered healthcare assistant designed to help users understand symptoms, analyze medical reports, check medication information, calculate BMI, and receive intelligent healthcare insights through a premium conversational interface.

---

## ✨ Features

### 🤖 AI Healthcare Chat Assistant

* Symptom analysis
* Medical guidance
* Follow-up conversation support
* Context-aware responses
* Natural conversational experience

### 📄 Medical Report Analyzer

* Upload PDF reports
* Upload medical scans/images
* OCR-powered text extraction
* AI-generated report explanations
* Patient-friendly summaries

### 💊 Drug Interaction Checker

* Medication information lookup
* Side effects explanation
* Safety precautions
* Drug interaction guidance
* Easy-to-understand language

### 🧮 BMI Calculator

* Instant BMI calculation
* Health category classification
* Quick wellness assessment

### 🖼️ Medical Image Analysis

* Upload medical images
* AI-powered visual observations
* General healthcare suggestions
* Safety recommendations

### 🎤 Voice Features

* Speech-to-text input
* Text-to-speech responses
* Hands-free interaction

### 🧠 Smart Conversation Management

* ChatGPT-style conversation titles
* Persistent chat history
* Context-aware follow-up questions
* User-specific conversations

---

## 🎨 User Interface

MedIntel AI includes:

* Premium healthcare dashboard
* Modern glassmorphism design
* Animated purple healthcare theme
* Floating medical icons
* Dynamic background glow effects
* Responsive layout
* Dark mode interface

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Lucide React

### Backend

* FastAPI
* Python
* SQLAlchemy
* SQLite

### AI & Machine Learning

* Groq API
* Llama 3.3 70B Versatile
* Llama 4 Scout 17B Instruct
* LangChain
* RAG (Retrieval Augmented Generation)

### OCR & Document Processing

* Tesseract OCR
* OpenCV
* PyMuPDF
* PDF2Image
* Poppler

---

##🧠 AI Architecture
1. Medical Chat Assistant

User Question
↓
LangChain Retriever
↓
Medical Knowledge Base
↓
Llama 3.3 70B
↓
Context-Aware Response

2. Medical Report Analysis

Report Upload
↓
OCR Extraction
↓
Structured Medical Data Extraction
↓
Llama 4 Scout
↓
Patient-Friendly Report Summary

3. Drug Interaction Analysis

Medication Input
↓
Medical Context Processing
↓
Llama 3.3 70B
↓
Safety & Interaction Guidance

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://Simi268/MedIntel-AI.git

cd MedIntel-AI
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Supported File Types

### Report Analyzer

* PDF
* PNG
* JPG
* JPEG
* TXT

### Image Analysis

* PNG
* JPG
* JPEG

---

## Key AI Capabilities

### Symptom Guidance

Examples:

* Fever
* Headache
* Dizziness
* Skin rash
* Chest pain
* Fatigue
* Burns
* Infections

### Medical Reports

Supports:

* Blood reports
* CBC reports
* Diabetes reports
* Radiology reports
* Prescriptions
* Discharge summaries

### Medication Support

Provides:

* Medication purpose
* Side effects
* Safety advice
* Interaction warnings

---

## Security Notice

MedIntel AI is designed for educational and informational purposes only.

The application:

* Does not provide medical diagnoses
* Does not replace professional healthcare advice
* Should not be used during medical emergencies

Always consult a qualified healthcare professional for diagnosis and treatment decisions.

---

## Future Improvements

* Appointment booking integration
* Healthcare provider recommendations
* Multi-language support
* Medical report history
* User profile dashboard
* Health risk prediction models
* Voice conversations
  

