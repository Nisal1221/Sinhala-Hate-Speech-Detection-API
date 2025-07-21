from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ocr_utils import extract_text
# from sentence_level.predict_sentence import predict_sentence_level
from token_level.predict_token import predict_token_level
from db import detections_collection
from datetime import datetime
from token_level.predict_token import predict_token_level, clean_ocr_text

app = FastAPI()

# 👇 Include both ports 3000 and 3001 for safety

# Allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ allow both ports if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 Helper function to group hate tokens into hate words
def group_hate_tokens(token_predictions):
    hate_words = []
    current_word = ""

    for item in token_predictions:
        token = item['token']
        label = item['label']

        if label == "Hate":
            clean_token = token.replace('▁', '')
            # New word boundary if token starts with ▁
            if token.startswith('▁') and current_word:
                hate_words.append(current_word)
                current_word = clean_token
            else:
                current_word += clean_token
        else:
            if current_word:
                hate_words.append(current_word)
                current_word = ""

    if current_word:
        hate_words.append(current_word)

    return hate_words


# 📌 token-level API
@app.post("/token-level/upload-image")
async def upload_image_token(file: UploadFile = File(...)):
    contents = await file.read()
    extracted_text = extract_text(contents)

    hate_words_detected = []
    token_predictions = []

    if extracted_text.strip():
        cleaned_text = clean_ocr_text(extracted_text)
        result = predict_token_level(cleaned_text)
        hate_words_detected = result["hate_words_detected"]
        token_predictions = result["token_predictions"]

        # Prepare data for database insertion
        detection_data = {
            "extracted_text": extracted_text,
            "hate_words_detected": hate_words_detected,
            "token_predictions": token_predictions,
            "timestamp": datetime.utcnow() # Add a timestamp
        }

        # Insert data into the collection
        try:
            insert_result = detections_collection.insert_one(detection_data)
            print(f"Successfully inserted detection with id: {insert_result.inserted_id}")
        except Exception as e:
            print(f"Error inserting detection into database: {e}")


    return {
        "extracted_text": extracted_text,
        "hate_words_detected": hate_words_detected,
        "token_predictions": token_predictions
    }