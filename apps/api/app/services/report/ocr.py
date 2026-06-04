import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import cv2
import os


# WINDOWS PATH
if os.name == "nt":
    pytesseract.pytesseract.tesseract_cmd = (
         r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)
        
    

def extract_text(file_path: str):

    ext = os.path.splitext(file_path)[1].lower()

    extracted_text = ""

    # ====================================
    # PDF
    # ====================================

    if ext == ".pdf":

        pages = convert_from_path(file_path)

        for page in pages:

            text = pytesseract.image_to_string(page)

            extracted_text += text + "\n"

    # ====================================
    # IMAGE
    # ====================================

    elif ext in [".png", ".jpg", ".jpeg"]:

        image = cv2.imread(file_path)

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        extracted_text = pytesseract.image_to_string(gray)

    # ====================================
    # TXT
    # ====================================

    elif ext == ".txt":

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as f:

            extracted_text = f.read()

    return extracted_text
