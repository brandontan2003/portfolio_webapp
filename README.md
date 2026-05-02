# V-X CORE: Hacker-Aesthetic Portfolio

A high-performance, single-page developer portfolio with a cyberpunk/hacker-inspired aesthetic. Built with **React**, **FastAPI**, and **Tailwind CSS**, and optimized for deployment on **Google Cloud Run**.

![Portfolio Preview](https://brandon-portfolio-466351933564.us-south1.run.app/assets/index-DUPK2YLy.css) <!-- Note: Replace with actual screenshot path if available -->

## 🚀 Live Demo
**[Live URL](https://brandon-portfolio-466351933564.us-south1.run.app)**

## 🛠 Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: FastAPI (Python 3.11), Uvicorn, Pydantic.
- **Deployment**: Docker, Google Cloud Run.

## 📁 Project Structure
```
portfolio_webapp/
├── src/                # React Frontend
│   ├── components/     # UI Components (Terminal, BentoGrid, Timeline, etc.)
│   └── App.jsx         # Main Layout
├── backend/            # FastAPI Backend
│   ├── main.py         # Unified Server & Chat Logic
│   └── resume_data.txt # AI Knowledge Base
├── dist/               # Built Frontend (Generated)
├── Dockerfile          # Production Container Config
└── package.json        # Node Dependencies
```

## 💻 Local Development

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.11+)

### 2. Setup Frontend
```bash
npm install
npm run dev
```

### 3. Setup Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python main.py
```

## 🚢 Production Build & Run
To run the unified application (Frontend served by Backend):
```bash
# From the root directory
npm run build
backend\venv\Scripts\python backend\main.py
```
The app will be available at `http://localhost:8080`.

## ☁️ Deployment
This project is containerized and ready for Google Cloud Run:
```bash
gcloud run deploy brandon-portfolio --source . --region <your-region> --allow-unauthenticated
```

## 🤖 Features
- **Terminal Hero**: Interactive CLI supporting custom commands (`help`, `about`, `linkedin`, `whoami`).
- **Tech Matrix**: Responsive Bento-style grid for skill categorization.
- **Dossier Timeline**: Experience and education tracking with Framer Motion animations.
- **Secure Chat**: AI-themed chatbot with a local knowledge base (`resume_data.txt`).

## 📄 License
MIT License - © 2026 Brandon Tan Hup Le
