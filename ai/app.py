import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("OPENROUTER_API_KEY")
if API_KEY is None:
    raise ValueError("API_KEY environment variable is not set")

class GenerateRequest(BaseModel):
    prompt: str
    tone: str
    format: str

@app.post("/generate")
async def generate_text(request: GenerateRequest):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "prompt": request.prompt,
        "tone": request.tone,
        "format": request.format,
    }
    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)

    logging.info(f"API Response Status Code: {response.status_code}")
    logging.info(f"API Response Content: {response.text}")


    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)
