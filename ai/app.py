import os
import requests
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from .env file
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

# Configure logging
logging.basicConfig(level=logging.INFO)

class GenerateRequest(BaseModel):
    prompt: str
    tone: str
    format: str

@app.post("/generate")
async def generate_text(request: GenerateRequest):
    # Construct the boilerplate prompt based on user input
    boilerplate_prompt = f"Write a copy for the purpose of {request.format} in a {request.tone} tone. The user prompt is: {request.prompt}"

    generated_text = f"Generate content based on the prompt: {boilerplate_prompt}"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "prompt": generated_text,
        "tone": request.tone,
        "format": request.format,
    }
    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)


    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)
