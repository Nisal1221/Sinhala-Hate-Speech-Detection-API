import cv2
import numpy as np
import pytesseract

# Set Tesseract OCR path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Preprocessing function
#hidden for public safe

# Extract text using Sinhala OCR
#hidden for public safe
        return text.strip()
    except Exception as e:
        print(f" OCR extraction failed: {e}")
        return ""

