from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone
import uuid
import os
import asyncio
from emergentintegrations.llm.chat import LlmChat, UserMessage
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/chat", tags=["chat"])

# MongoDB connection (will be injected from main app)
db = None

def set_db(database):
    global db
    db = database

class ChatMessageRequest(BaseModel):
    message: str
    session_id: str

class ChatMessage(BaseModel):
    id: str
    session_id: str
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: str

async def get_company_context():
    """Get company data from database to use as context"""
    company_data = await db.company_data.find_one({}, {"_id": 0})
    
    if not company_data:
        return """Si AI asistent za podjetje Asistent RM. 
Pomagaš strankam z informacijami o naših storitvah AI receptorke in virtualne tajnice.
Govori tekoče slovensko. Bodi prijazen, profesionalen in zelo pomočljiv.
Če te vprasajo o podrobnostih, povej da lahko pokličejo na +386 59 790 410 ali obiščejo asistent-rm.org."""
    
    # Build context from quiz data
    context_parts = [
        "Si AI asistent za podjetje Asistent RM. Govori tekoče slovensko. Bodi prijazen, profesionalen in zelo pomočljiv.",
        f"Osnovne informacije: {company_data.get('basic_info', 'Ni podatkov')}",
        f"Naše storitve: {company_data.get('services', 'Ni podatkov')}",
        f"Cene: {company_data.get('pricing', 'Ni podatkov')}",
        f"Pogosta vprašanja: {company_data.get('faq', 'Ni podatkov')}",
        f"Kontakt: {company_data.get('contact', 'Ni podatkov')}",
        f"Delovni čas: {company_data.get('working_hours', 'Ni podatkov')}",
        f"Kako deluje demo: {company_data.get('demo_info', 'Ni podatkov')}",
    ]
    
    return "\n".join(context_parts)

@router.post("/send")
async def send_message(request: ChatMessageRequest):
    """Send chat message and get streaming response using Gemini"""
    try:
        # Save user message
        user_message = {
            "id": str(uuid.uuid4()),
            "session_id": request.session_id,
            "role": "user",
            "content": request.message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(user_message)
        
        # Get company context
        system_context = await get_company_context()
        
        # Initialize Gemini chat
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        chat = LlmChat(
            api_key=api_key,
            session_id=request.session_id,
            system_message=system_context
        ).with_model("gemini", "gemini-3.1-pro-preview")
        
        # Prepare user message
        user_msg = UserMessage(text=request.message)
        
        # Get response (non-streaming for simplicity with current SDK)
        async def generate():
            try:
                # Call LLM
                response_text = await asyncio.to_thread(chat.send_message, user_msg)
                
                # Save assistant response
                assistant_message = {
                    "id": str(uuid.uuid4()),
                    "session_id": request.session_id,
                    "role": "assistant",
                    "content": response_text,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
                await db.chat_messages.insert_one(assistant_message)
                
                # Stream the response word by word for better UX
                words = response_text.split(' ')
                for i, word in enumerate(words):
                    yield f"data: {word} \n\n"
                    await asyncio.sleep(0.03)  # Small delay for streaming effect
                
                yield "data: [DONE]\n\n"
            except Exception as e:
                yield f"data: [ERROR] {str(e)}\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        messages = await db.chat_messages.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(1000)
        return {"messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
