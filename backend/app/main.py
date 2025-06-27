from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import pickle
from torch.nn import functional as F
from huggingface_hub import hf_hub_download

# Initialize FastAPI
app = FastAPI()

# ✅ Allow any *.vercel.app subdomain + localhost (for testing)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*vercel\.app|http://localhost:3000|http://127.0.0.1:3000",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Clean up 404 logs from Render's health checks
@app.get("/")
def read_root():
    return {"status": "OK", "message": "Sentiment Analysis API is live"}

# Set device (GPU if available)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load tokenizer and model from Hugging Face Hub
MODEL_NAME = "McKlay/sentiment-analysis-v2"
tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)
model = BertForSequenceClassification.from_pretrained(MODEL_NAME)
model.to(device)
model.eval()

# Load label encoder (e.g., ["Negative", "Neutral", "Positive"])
encoder_path = hf_hub_download(repo_id=MODEL_NAME, filename="label_encoder.pkl")
with open(encoder_path, "rb") as f:
    label_encoder = pickle.load(f)

# Request schema
class SentimentRequest(BaseModel):
    text: str

# Inference endpoint
@app.post("/predict")
def predict_sentiment(request: SentimentRequest):
    text = request.text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        logits = model(**inputs).logits
        probabilities = F.softmax(logits, dim=1)
        confidence = torch.max(probabilities).item()
        pred_idx = torch.argmax(logits, dim=1).item()

    sentiment = label_encoder.inverse_transform([pred_idx])[0]
    return {
        "text": text,
        "sentiment": sentiment,
        "confidence_score": round(confidence * 100, 2)
    }