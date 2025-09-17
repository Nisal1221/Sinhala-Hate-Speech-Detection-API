# train_token_model.py
import torch
from datasets import load_from_disk
from transformers import (
    AutoTokenizer,
    AutoModelForTokenClassification,
    Trainer,
    TrainingArguments,
)
from sklearn.metrics import accuracy_score

# 1) load tokenized data
data = load_from_disk("token_classification_data")
train_ds, eval_ds = data["train"], data["test"]

# 2) load model & tokenizer
tokenizer = AutoTokenizer.from_pretrained("xlm-roberta-base")
model = AutoModelForTokenClassification.from_pretrained(
    "xlm-roberta-base",
    num_labels=2,
)

# 3) metrics
#hidden for public safe
# 4) training args
#hidden for public safe

# 5) Trainer
#hidden for public safe
# 6) train!
trainer.train()

# 7) save model & tokenizer
model.save_pretrained("token_level_model")
tokenizer.save_pretrained("token_level_model")
print("✅ Final model saved to 'token_level_model'")

