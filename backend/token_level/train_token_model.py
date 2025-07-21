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
def compute_metrics(pred):
    logits, labels = pred
    preds = logits.argmax(-1).flatten()
    labs = labels.flatten()
    mask = labs != -100
    return {"accuracy": accuracy_score(labs[mask], preds[mask])}

# 4) training args
args = TrainingArguments(
    output_dir="token_level_model",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="accuracy",
    logging_dir="./logs",
    logging_steps=100,
    report_to="none",
    fp16=torch.cuda.is_available(),
)

# 5) Trainer
trainer = Trainer(
    model=model,
    args=args,
    train_dataset=train_ds,
    eval_dataset=eval_ds,
    compute_metrics=compute_metrics,
)

# 6) train!
trainer.train()

# 7) save model & tokenizer
model.save_pretrained("token_level_model")
tokenizer.save_pretrained("token_level_model")
print("✅ Final model saved to 'token_level_model'")
