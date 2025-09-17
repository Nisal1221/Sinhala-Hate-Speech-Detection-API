import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification

LABELS = ["O", "Hate"]

tokenizer = AutoTokenizer.from_pretrained("token_level_model")
model     = AutoModelForTokenClassification.from_pretrained("token_level_model")
model.eval()

def predict_sentence(text):
    # 1) Tokenize full sentence
#hidden for public safe
if __name__ == "__main__":
    for sentence in [
        "@USER අනේ මේ පයිය වහන් හිටු",
        "එහෙමද හුත්තො කැරි බල්ලො",
        "ඔය බනින්නෙ.."
        "@USER @USER හිනා උනේ"
        "@USER @USER හිනා උනේ පකෝ වරෙන් ඒක හාන්න"
        "පකෝ පුක පොන්න"
        "ගොබ්බ හු@තො කැ* බල්ලො"
        "මේ වගේ කැ* හොරු ඉන්න රටක ජීවත් වෙන එකත් එපා වෙලා තියෙන්නෙ හු@ත"
        
        
        
        
        
    ]:
        print(sentence)
        for w, lbl in predict_sentence(sentence):
            print(f"{w:15} -> {lbl}")
        print()

