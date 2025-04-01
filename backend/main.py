import os
import httpx
import asyncio
import logging
from typing import List, Dict
from dotenv import load_dotenv

from pydantic import BaseModel

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from utils import clean_response

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Groq Chatbot API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable not set")

# Groq API endpoint
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Available models
MODELS = {
    "deepseek-r1-distill-llama-70b":"deepseek-r1-distill-llama-70b",
    "llama-3.3-70b-versatile":"llama-3.3-70b-versatile", 
    "qwen-qwq-32b":"qwen-qwq-32b",
    "qwen-2.5-coder-32b":"qwen-2.5-coder-32b"
}



# Define request/response models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    model: str = "deepseek-r1-distill-llama-70b"
    temperature: float = 0.7
    max_tokens: int = 800
    stream: bool = False

class ChatResponse(BaseModel):
    response: str
    model: str

# Helper function to make API calls to Groq
async def call_groq_api(payload: Dict) -> Dict:
    async with httpx.AsyncClient() as client:
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
            "Groq-Organization": os.getenv("GROQ_ORGANIZATION_ID")
        }

        try:
            response = await client.post(
                GROQ_API_URL,
                headers=headers,
                json=payload,
                timeout=30.0  # Extended timeout
            )

            # Log the full response
            logger.error(f"Groq API Response: {response.status_code} - {response.text}")

            if response.status_code != 200:
                error_message = f"Groq API Error: {response.status_code} - {response.text}"
                raise HTTPException(status_code=response.status_code, detail=error_message)

            return response.json()
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Error communicating with Groq API: {str(e)}")


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    logger.info(f"request model {request.model}")
    # Validate model selection
    if request.model not in MODELS:
        raise HTTPException(status_code=400, detail=f"Model must be one of: {', '.join(MODELS.keys())}")
    
    # Format messages for the Groq API
    formatted_messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
    logger.info(f"Received request: {request.dict()}")

    # Prepare the payload for Groq
    payload = {
        "model": MODELS[request.model],
        "messages": formatted_messages,
        "temperature": request.temperature,
        "max_tokens": request.max_tokens,
        "stream": request.stream
    }

    # Call the Groq API
    try:
        start_time = asyncio.get_event_loop().time()
        response_data = await call_groq_api(payload)
        end_time = asyncio.get_event_loop().time()

        # Extract response text
        assistant_message = response_data.get("choices", [{}])[0].get("message", {}).get("content", "")

        if not assistant_message:
            logger.error(f"Groq API response did not contain valid 'choices': {response_data}")
            raise HTTPException(status_code=500, detail="Invalid response from Groq API")

        # Log response time
        response_time = (end_time - start_time) * 1000  # in milliseconds
        logger.info(f"Groq response time: {response_time:.2f}ms")

        assistant_message = clean_response(assistant_message)
        return ChatResponse(
            response=assistant_message,
            model=request.model
        )

    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")


@app.get("/models")
async def get_models():
    """Return the list of available models"""
    return {"models": list(MODELS.keys())}

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)