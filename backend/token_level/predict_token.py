import re
import torch
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForTokenClassification
import joblib

# ✅ Load model and tokenizer from local path
model_dir = Path(__file__).parent / "token_level_model"
model_dir = model_dir.resolve().as_posix()

tokenizer = AutoTokenizer.from_pretrained(model_dir, local_files_only=True)
model = AutoModelForTokenClassification.from_pretrained(model_dir, local_files_only=True)

# ✅ Load label encoder
label_encoder_path = Path(model_dir) / "label_encoder.pkl"
label_list = joblib.load(label_encoder_path)
label_map = {i: label for i, label in enumerate(label_list)}

# ✅ Text cleaner (mild only, to preserve alignment)
def clean_ocr_text(text: str) -> str:
    # Only remove double/triple spaces and strip
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

# ✅ Token-level prediction
def predict_token_level(text: str):
    text = clean_ocr_text(text)
    inputs = tokenizer(text, return_tensors="pt", truncation=True, is_split_into_words=False)
    outputs = model(**inputs)
    predictions = torch.argmax(outputs.logits, dim=-1)

    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    labels = [label_map[p.item()] for p in predictions[0]]

    token_predictions = [{"token": token, "label": label} for token, label in zip(tokens, labels)]

    # ✅ Reconstruct hate words (merge subwords using ▁)
    hate_words = []
    current_word = ""

    for token, label in zip(tokens, labels):
        clean_token = token.replace("▁", "")
        if label == "Hate":
            if token.startswith("▁") and current_word:
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

    # ✅ Filter: Remove punctuation & special symbols (NOT stopwords like @USER)
    filtered_hate_words = [
        word for word in hate_words
        if word and word not in ["<s>", "</s>", ".", ",", "!", "?", "..."]
    ]

    return {
        "token_predictions": token_predictions,
        "hate_words_detected": filtered_hate_words
    }

print(f"✅ Model loaded from: {model_dir}")
