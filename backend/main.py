from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# Resume Data Fallback Logic (Static Knowledge Base)
def get_dossier_response(query: str):
    q = query.lower()
    
    if any(k in q for k in ["gpa", "nyp", "poly", "education", "school", "grade"]):
        return "QUERY PROCESSED: Brandon Tan Hup Le graduated from Nanyang Polytechnic with a Diploma in Business & FinTech. Academic Status: GPA 3.98/4.0, OCBC Bank Silver Medalist, 3x Director's List."
    
    if any(k in q for k in ["accenture", "experience", "work", "job", "intern", "role"]):
        return "QUERY PROCESSED: Professional record indicates tenure at Accenture as an App Developer (Mar 2024 - Aug 2024) and Software Engineer Intern (Apr 2023 - Mar 2024). Specializations: OpenAPI, Microservices, Spring Batch, RedHat PAM."
    
    if any(k in q for k in ["skill", "tech", "java", "python", "docker", "stack", "language"]):
        return "QUERY PROCESSED: Brandon's tech matrix includes Java, Spring Boot, Microservices, Python, SQL, Docker, and Git. Automation expertise: RedHat PAM, Robot Framework. Cloud: AWS, Vercel, Google Cloud Platform, Railway."
    
    if any(k in q for k in ["project", "hackathon", "brainhack"]):
        return "QUERY PROCESSED: Active Project Detected: Brainhack 2026 Hackathon. Status: IN PROGRESS. Developing secure, high-performance solutions using cutting-edge architecture."
    
    if any(k in q for k in ["contact", "linkedin", "reach", "email", "connect"]):
        return "QUERY PROCESSED: Secure communication channel established. You can connect with Brandon on LinkedIn at: https://www.linkedin.com/in/brandon-tan03/"
    
    if any(k in q for k in ["who", "brandon", "about", "identity"]):
        return "QUERY PROCESSED: Brandon is a Software Engineer specializing in enterprise application development and automation. Identity verified. Status: ACTIVE."

    return "UNAUTHORIZED QUERY: Information not found in the secured dossier. Please refine your query parameters (e.g., 'skills', 'experience', 'education')."

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    response = get_dossier_response(request.message)
    return {"reply": response}

# --- UNIFIED DEPLOYMENT LOGIC ---
# Serve the React 'dist' folder as static files
# We check if 'dist' exists (it will be created during Docker build)
dist_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "dist")

if os.path.exists(dist_path):
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")
    
    @app.exception_handler(404)
    async def not_found_handler(request: Request, exc):
        return FileResponse(os.path.join(dist_path, "index.html"))

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable or default to 8080 (GCP Run standard)
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
