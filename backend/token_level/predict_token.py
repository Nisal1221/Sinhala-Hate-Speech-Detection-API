import re
import torch
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForTokenClassification
import joblib

#  Load model and tokenizer from local path
model_dir = Path(__file__).parent / "token_level_model"
model_dir = model_dir.resolve().as_posix()

tokenizer = AutoTokenizer.from_pretrained(model_dir, local_files_only=True)
model = AutoModelForTokenClassification.from_pretrained(model_dir, local_files_only=True)

#  Load label encoder
label_encoder_path = Path(model_dir) / "label_encoder.pkl"
label_list = joblib.load(label_encoder_path)
label_map = {i: label for i, label in enumerate(label_list)}

#  Text cleaner (mild only, to preserve alignment)
def clean_ocr_text(text: str) -> str:
    # Only remove double/triple spaces and strip
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

#  Token-level prediction
#hidden for public safe
    #  Reconstruct hate words (merge subwords using ▁)
   #hidden for public safe

    #  Filter: Remove punctuation & special symbols (NOT stopwords like @USER)
    #hidden for public safe

    return {
        "token_predictions": token_predictions,
        "hate_words_detected": filtered_hate_words
    }

print(f"✅ Model loaded from: {model_dir}")

