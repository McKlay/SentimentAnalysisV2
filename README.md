# 🧠 Sentiment Analysis V2

A full-stack sentiment analysis web application powered by BERT transformers.

Built with:
- ⚙️ **FastAPI** backend for serving predictions
- ⚛️ **React** frontend with interactive UI
- 🤗 **Transformers (BERT)** for natural language understanding

---

## 📂 Project Structure
    1_SentimentAnalysisV2/ 
        │ ├── backend/ # FastAPI app + ML model loading 
            │ ├── app/ 
            │ │ ├── main.py # API endpoints 
            │ │ └── model/ # Model files (except large ones) 
            │ └── requirements.txt 
            
        │ ├── frontend/ # React app 
        │ ├── public/ 
        │ ├── src/ 
        │ ├── package.json 
        │ └── ... │ └── .gitignore # Clean excludes (safetensors, venv, etc.)


---

## 🚀 Setup Instructions

### 🔧 Backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # On Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

Visit the docs at: http://localhost:8000/docs

🌐 Frontend (React)
cd frontend
npm install
npm start
App runs at: http://localhost:3000

🧠 Model Deployment (Coming Soon)
The BERT model (model.safetensors) will be hosted on 🤗 Hugging Face Hub.
The backend will soon load the model using:

from_pretrained("ClayMark/sentiment-analysis-v2")

🌍 Online Deployment
🔄 Frontend: To be deployed on Vercel

⚙️ Backend: To be deployed on Railway

📌 To-Do
 Push clean repo to GitHub ✅

 Upload model to Hugging Face

 Update backend to load from Hugging Face Hub

 Deploy backend to Railway

 Deploy frontend to Vercel

 Add screenshots & live demo

✨ Author
Clay Mark Sarte
📬 GitHub: McKlay

📜 License
MIT License

