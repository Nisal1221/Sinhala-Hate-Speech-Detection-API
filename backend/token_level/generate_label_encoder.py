# generate_label_encoder.py
import joblib, os

labels = ["O", "Hate"]  # 0 → O, 1 → Hate
save_path = os.path.join("token_level_model", "label_encoder.pkl")
os.makedirs(os.path.dirname(save_path), exist_ok=True)
joblib.dump(labels, save_path)
print(f"✅ label_encoder.pkl saved at: {save_path}")
