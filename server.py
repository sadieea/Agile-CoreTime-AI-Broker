from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio

class ChatRequest(BaseModel):
    message: str
    stream: bool = True

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: ChatRequest, raw_request: Request):
    if request.stream:
        # ---------------------------------------
        # Return streaming response
        # ---------------------------------------
        async def event_stream():
            for token in generate_tokens(request.message):
                yield f"data: {token}\n\n"
                await asyncio.sleep(0.05)
            yield "data: [DONE]\n\n"

        return StreamingResponse(event_stream(), media_type="text/event-stream")
    else:
        # ---------------------------------------
        # Return JSON response
        # ---------------------------------------
        response_text = "".join(generate_tokens(request.message))
        return JSONResponse(content={"response": response_text})


def generate_tokens(message: str):
    # Dummy token generator: 1 char = 1 token
    for char in message:
        yield char
