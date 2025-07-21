import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification
import joblib

# ✅ Load model, tokenizer, and label encoder
model_path = "token_level_model"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForTokenClassification.from_pretrained(model_path)
labels = joblib.load(f"{model_path}/label_encoder.pkl")  # ["O", "Hate"]

# ✅ Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

# ✅ Input Sinhala sentence (change this to test others)
sentence = "අනේ මේ හුත්තො ඔයා මොකද කරන්නෙ පැටියො"

# ✅ Tokenize input sentence
tokens = tokenizer.tokenize(tokenizer.decode(tokenizer.encode(sentence)))
inputs = tokenizer.encode_plus(
    sentence,
    return_tensors="pt",
    truncation=True,
    padding="max_length",
    max_length=64,
    return_offsets_mapping=True
)

# ✅ Move to device
inputs = {k: v.to(device) for k, v in inputs.items() if k != "offset_mapping"}

# ✅ Predict
with torch.no_grad():
    outputs = model(**inputs)
    predictions = torch.argmax(outputs.logits, dim=-1).squeeze().tolist()

# ✅ Decode tokens and predictions
decoded_tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"].squeeze())

print("\n🔍 Token-level predictions:\n")
for token, pred in zip(decoded_tokens, predictions):
    label = labels[pred] if pred != -100 else "IGN"
    print(f"{token:15} -> {label}")

