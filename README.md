README – HariWachana.LK
Sinhala Hate Speech Detection API (2025 Final Year Project)

───────────────────────────────────────────────────────────────
 PROJECT OVERVIEW
───────────────────────────────────────────────────────────────
HariWachana.LK is an AI-powered RESTful API that detects hate speech in Sinhala language text. It uses advanced NLP techniques to analyze user-submitted sentences or OCR-extracted content from images and highlight hate-inducing words. The system is designed for moderation, educational, and public awareness use cases.

───────────────────────────────────────────────────────────────
 TECHNOLOGIES USED
───────────────────────────────────────────────────────────────
→ Frontend: React.js
→ Backend: FastAPI (Python)
→ Database: MongoDB Atlas
→ Dataset : Hugging Face SOLD dataset.
→ OCR: Tesseract OCR (pytesseract)
→ NLP Model: XLM-RoBERTa Token Classification
→ Libraries: Hugging Face Transformers, Datasets, PyTorch, Pandas, Scikit-learn, Joblib

───────────────────────────────────────────────────────────────
 PROJECT STRUCTURE
───────────────────────────────────────────────────────────────
backend/
│
├── token_level/
│   ├── data/                         ← Tokenized data folder
│   ├── token_level_model/            ← Saved Hugging Face model
│   ├── sold_token_dataset.csv        ← Word-level dataset with rationales
│   ├── hate_words_extracted.csv      ← Extracted hate and non hate words in dataset with post_id, token and rationales
│   ├── train_token_model.py          ← Model training script
│   ├── predict_token.py              ← Inference function
│   ├── test.py, test1.py             ← Manual test runners
│   ├── build_sequence_dataset.py     ← Dataset processor
│   ├── generate_label_encoder.py     ← Saves label map (O/Hate)
│   ├── generate_cleaned_sold.py      ← For Testing(Original dataset cleaner)
│   └── extract_tokens.py             ← Token-level preprocessing logic
│
├── ocr_utils.py                      ← OCR processing & cleaning
├── main.py                           ← FastAPI server
├── db.py                             ← MongoDB connection
├── .env                              ← Environment secrets ( DB URI)
└── requirements.txt                  ← Python dependencies

frontend/                    
my-react-app/                          ← React.js frontend (API consumer)

├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AboutUs.js / AboutUs.css
│   │   ├── ApiStack.js / ApiStack.css
│   │   ├── ContactUs.js / ContactUs.css
│   │   ├── ContentSection.js / ContentSection.css
│   │   ├── Footer.js / Footer.css
│   │   ├── LogIn.js / LogIn.css
│   │   ├── Navbar.js / Navbar.css
│   │   ├── Pricing.js / Pricing.css
│   │   ├── SignUp.js / SignUp.css
│   │   ├── Slider.js / Slider.css
│   │   ├── Upload.js / Upload.css
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── style.css
├── server/
│   ├── routes/users.js
│   ├── models/User.js
│   ├── sendEmail.js
│   └── userBackend.js
├── .env
├── package.json
├── package-lock.json



───────────────────────────────────────────────────────────────
 API USAGE
───────────────────────────────────────────────────────────────
► Endpoint: POST /token-level/upload-image
► Description: Accepts image uploads (JPG, PNG) with Sinhala text and returns:
   - Extracted raw text
   - List of detected hate words
   - All tokens with labels ("O" or "Hate")

► Sample Header:
Authorization: Bearer demo-API-KEY-8749-XYZ

► Sample JSON Response:
```json
{
  "extracted_text": "මේ හුත්තා  තමයි ඒ",
  "hate_words_detected": ["හුත්තා "],
  "token_predictions": [
    { "token": "මේ", "label": "O" },
    { "token": "හුත්තා ", "label": "Hate" },
    { "token": "තමයි", "label": "O" },
    { "token": "ඒ", "label": "O" }
  ]
}

───────────────────────────────────────────────────────────────
 MODEL INFO
───────────────────────────────────────────────────────────────
→ Architecture: XLM-RoBERTa base (270M parameters)
→ Task: Token Classification (Hate vs Non-Hate)
→ Input: Word-level tokens (from full sentences)
→ Labels: 0 = O (Non-Hate), 1 = Hate
→ Trained Epochs: 3
→ Accuracy Achieved: ~95.6% 
→ Dataset: Original SOLD (Sinhala Offensive Language Dataset), cleaned version

───────────────────────────────────────────────────────────────
 KEY FEATURES
───────────────────────────────────────────────────────────────
✓ Sinhala language support
✓ OCR image-to-text input support
✓ Detects hate words, even with subword splits or profanity
✓ CORS-enabled API for external integration
✓ MongoDB logging of all predictions with timestamps
✓ Modular, scalable backend (FastAPI)

───────────────────────────────────────────────────────────────
 LIMITATIONS
───────────────────────────────────────────────────────────────

OCR may not fully detect masked Sinhala characters (e.g., හු@තා, ප#යා)- But we can test it in the test1.py file without OCR.

Detection may struggle if image quality is poor

Tesseract has limited support for certain Sinhala font types

───────────────────────────────────────────────────────────────
 FUTURE IMPROVEMENTS
───────────────────────────────────────────────────────────────
→ Replace Tesseract with Google Cloud Vision or PaddleOCR for higher Sinhala OCR accuracy.
→ Add sentence-level offensive score.
→ Add user authentication & API rate limiting.
→ Host API on cloud (Render, AWS, Railway) for public access.
→ Admin dashboard to view logs and visualize stats.
→ Reversed Words detection.




───────────────────────────────────────────────────────────────
 HOW TO RUN THE PROJECT
───────────────────────────────────────────────────────────────
1. Start Backend (FastAPI)

	cd backend
	uvicorn main:app --reload

2. Train the Model (Already trained)

	python train_token_model.py

3. Start Frontend	
	
	cd my-react-app
	npm install
	npm start

4. Start Backend (Backend of user authentication and MailJet)

	myProjects\my-react-app\server>node userBackend.js

───────────────────────────────────────────────────────────────
TESTING THE API.───────────────────────────────────────────────────────────────

POST http://localhost:8000/token-level/upload-image

For MASKED-HATE WORDS DETECTION TESTING,

backend\token_level>python test1.py

───────────────────────────────────────────────────────────────
 CREDITS
───────────────────────────────────────────────────────────────
Developed by: Nisal Lakshan Basnayake
University: University of Plymouth,UK
Student ID : 10899168
Project Year: 2025
Supervisor: Dulanjali Wijesekara.
