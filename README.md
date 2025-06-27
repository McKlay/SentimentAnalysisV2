---
title: SentimentAnalysisV2
emoji: 💬
colorFrom: gray
colorTo: pink
sdk: fastapi
app_file: main.py
pinned: true
license: mit
tags:
  - nlp
  - sentiment-analysis
  - fastapi
  - huggingface
  - reactjs
  - vercel
  - render
  - transformer
---

[![Deployed on Render](https://img.shields.io/badge/Backend-Render-blue?logo=render&style=flat-square)](https://sentimentanalysisv2.onrender.com)
[![Frontend on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel&style=flat-square)](https://sentiment-analysis-v2.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![GitHub last commit](https://img.shields.io/github/last-commit/McKlay/SentimentAnalysisV2)
![GitHub Repo stars](https://img.shields.io/github/stars/McKlay/SentimentAnalysisV2?style=social)
![GitHub forks](https://img.shields.io/github/forks/McKlay/SentimentAnalysisV2?style=social)
![MIT License](https://img.shields.io/github/license/McKlay/SentimentAnalysisV2)
![Visitors](https://visitor-badge.laobi.icu/badge?page_id=McKlay.SentimentAnalysisV2)

---

# 💬 Sentiment Analysis V2

A real-time sentiment classifier built with **FastAPI**, **Hugging Face Transformers**, and a modern **ReactJS** frontend.

> Paste a YouTube comment or any sentence — this app will analyze and return its sentiment with confidence score.

---

## 🌐 Live Demo

- **Backend (Render):** [`https://sentimentanalysisv2.onrender.com`](https://sentimentanalysisv2.onrender.com)  
- **Frontend (Vercel):** [`https://sentiment-analysis-v2.vercel.app`](https://sentiment-analysis-v2.vercel.app)

---

## Model & Pipeline

- **Model**: Fine-tuned BERT (Hugging Face: `McKlay/sentiment-analysis-v2`)
- **Tokenizer**: Hugging Face `BertTokenizer`
- **Postprocessing**: Softmax + confidence score
- **Classes**: Positive 😄 / Neutral 😐 / Negative 😠

---

## Tech Stack

- **Frontend**: ReactJS + Axios + TailwindCSS
- **Backend**: FastAPI (Python), deployed on Render
- **Model Hosting**: Hugging Face Hub
- **Deployment**: 
  - Frontend via **Vercel**
  - Backend via **Render**

---

## Full Deployment Workflow

1. **Backend** containerized with a Dockerfile inside `/backend`
2. Render handles auto-deployment and exposes the `PORT` env variable
3. FastAPI uses:
   ```python
   CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
    ```

4. **CORS** handled via `allow_origin_regex=r"https://.*vercel\.app"` to support all Vercel preview and production URLs
5. Added root `/` endpoint for Render health checks

---

## Features

* Real-time sentiment analysis on text input
* Clean UI with dark mode toggle
* Hugging Face model loading (no local files)
* Confidence score (%) for predictions
* Fully working with free-tier deployment platforms

---

## How to Use

1. Visit: [Frontend App](https://sentiment-analysis-v2.vercel.app)
2. Paste any text like:

   > "I love this project!"
3. Click `Analyze Sentiment`
4. View the sentiment prediction and confidence

---

## Project Structure

```bash
SentimentAnalysisV2/
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI backend
│   │   ├── requirements.txt    # Dependencies
│   └── Dockerfile              # Render deployment
│
├── frontend/
│   ├── src/                    # ReactJS UI
│   ├── public/
│   └── package.json
```

---

## Local Setup

```bash
# Backend
cd backend/app
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd ../../frontend
npm install
npm start
```

---

## API Endpoint

| Route      | Method | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| `/predict` | POST   | Accepts `text` input and returns prediction   |
| `/`        | GET    | Root route for uptime checks (used by Render) |

---

## Deployment Notes

| Service  | URL                                           | Notes                                     |
| -------- | --------------------------------------------- | ----------------------------------------- |
| Render   | `https://sentimentanalysisv2.onrender.com`    | FastAPI Docker container                  |
| Vercel   | `https://sentiment-analysis-v2.vercel.app`    | ReactJS frontend with API URL from Render |
| CORS Fix | `allow_origin_regex=r"https://.*vercel\.app"` | Supports all Vercel preview deployments   |

---

## 👨‍💻 Author

Built by [Clay Mark Sarte](https://github.com/McKlay)  
ML Engineer • Full Stack Dev • Tech Explorer

---

## License

This project is licensed under the **MIT License**.

---