import os
import logging
import httpx
from fastapi import APIRouter
from dotenv import load_dotenv


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
router = APIRouter()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1"

@router.get("/test_model")
async def test_model(model_name: str = "llama-3.3-70b-versatile"):  # <---- DEFAULT MODEL
    """Tests a specific model against the Groq API."""

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model_name,
        "messages": [{"role": "user", "content": "Test message."}],
        "temperature": 0.7,
        "max_tokens": 50
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{GROQ_API_URL}/chat/completions", headers=headers, json=payload)
            response.raise_for_status()  # Raise HTTPError for bad responses

            return response.json()

        except httpx.HTTPStatusError as e:
            return {"error": str(e), "response_text": e.response.text if e.response else None}
        except Exception as e:
            return {"error": str(e)}
        
async def list_available_models():
    async with httpx.AsyncClient() as client:
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        response = await client.get("https://api.groq.com/openai/v1/models", headers=headers)
        logger.info(f'response: {response}')
        return response.json()

if __name__ == "__main__":
    list_available_models()