import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification
import joblib

#  Load model, tokenizer, and label encoder
model_path = "token_level_model"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForTokenClassification.from_pretrained(model_path)
labels = joblib.load(f"{model_path}/label_encoder.pkl")  # ["O", "Hate"]

# ✅Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

#  Input Sinhala sentence 
sentence = "අනේ මේ හුත්තො ඔයා මොකද කරන්නෙ පැටියො"

#hidden for public safe
