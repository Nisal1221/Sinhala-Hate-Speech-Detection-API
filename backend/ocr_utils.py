import cv2
import numpy as np
import pytesseract

# Set Tesseract OCR path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Preprocessing function
def preprocess_image_cv(image):
    # 1. Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 2. Apply bilateral filter (better than Gaussian for edges)
    filtered = cv2.bilateralFilter(gray, 11, 17, 17)

    # 3. Apply adaptive thresholding
    thresh = cv2.adaptiveThreshold(
        filtered, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY, 31, 2
    )

    # 4. Resize image larger
    resized = cv2.resize(thresh, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)

    # 5. Sharpen the resized image
    kernel = np.array([[0, -1, 0],
                       [-1, 5, -1],
                       [0, -1, 0]])
    sharpened = cv2.filter2D(resized, -1, kernel)

    return sharpened

# Extract text using Sinhala OCR
def extract_text(image_bytes):
    try:
        # Convert bytes to image
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is None:
            return ""

        # Preprocess image
        processed_img = preprocess_image_cv(image)

        # OCR configuration
        custom_config = r'--oem 3 --psm 6 -l sin+eng'

        # Extract text
        text = pytesseract.image_to_string(processed_img, config=custom_config)

        return text.strip()
    except Exception as e:
        print(f"❌ OCR extraction failed: {e}")
        return ""
