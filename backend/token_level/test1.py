import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification

LABELS = ["O", "Hate"]

tokenizer = AutoTokenizer.from_pretrained("token_level_model")
model     = AutoModelForTokenClassification.from_pretrained("token_level_model")
model.eval()

def predict_sentence(text):
    # 1) Tokenize full sentence
    inputs = tokenizer(text,
                       return_tensors="pt",
                       truncation=True,
                       padding="longest",
                       is_split_into_words=False)
    # 2) Forward pass
    with torch.no_grad():
        logits = model(**inputs).logits  # (1, seq_len, 2)
    preds = logits.argmax(-1)[0].tolist()

    # 3) Map back to word indices
    word_ids = inputs.word_ids(batch_index=0)
    words, word_preds = [], []
    current_word, current_labels = None, []

    for token, pred, w_id in zip(tokenizer.convert_ids_to_tokens(inputs["input_ids"][0]), preds, word_ids):
        # skip special tokens
        if w_id is None:
            continue
        # start of a new word
        if w_id != current_word:
            if current_word is not None:
                # majority vote (or “any Hate”)
                label = "Hate" if any(l==1 for l in current_labels) else "O"
                words.append(word_str)
                word_preds.append(label)
            current_word = w_id
            # rebuild the surface form
            word_str = token.replace("▁", "")
            current_labels = [pred]
        else:
            # continuation of same word
            word_str += token.replace("▁", "")
            current_labels.append(pred)

    # don't forget last word
    if current_labels:
        label = "Hate" if any(l==1 for l in current_labels) else "O"
        words.append(word_str)
        word_preds.append(label)

    return list(zip(words, word_preds))

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
