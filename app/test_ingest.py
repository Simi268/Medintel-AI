from pathlib import Path
from app.services.rag.ingest import ingest_pdf

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

pdf_path = BASE_DIR / "data" / "medical_pdfs" / "guide.pdf"

print(pdf_path)

ingest_pdf(str(pdf_path))