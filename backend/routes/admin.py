from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
import uuid

router = APIRouter(prefix="/admin", tags=["admin"])

# MongoDB connection (will be injected from main app)
db = None

def set_db(database):
    global db
    db = database

class CompanyDataRequest(BaseModel):
    basic_info: Optional[str] = None
    services: Optional[str] = None
    pricing: Optional[str] = None
    faq: Optional[str] = None
    contact: Optional[str] = None
    working_hours: Optional[str] = None
    demo_info: Optional[str] = None
    other_info: Optional[str] = None

class ChatSession(BaseModel):
    session_id: str
    message_count: int
    first_message_time: str
    last_message_time: str
    preview: str

@router.post("/company-data")
async def save_company_data(data: CompanyDataRequest):
    """Save or update company data from quiz"""
    try:
        doc = data.model_dump()
        doc['updated_at'] = datetime.now(timezone.utc).isoformat()
        
        # Upsert - update if exists, insert if not
        await db.company_data.update_one(
            {},
            {"$set": doc},
            upsert=True
        )
        
        return {"success": True, "message": "Podatki shranjeni"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/company-data")
async def get_company_data():
    """Get current company data"""
    try:
        data = await db.company_data.find_one({}, {"_id": 0})
        if not data:
            return {}
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chats")
async def get_all_chats():
    """Get all chat sessions with summary"""
    try:
        # Aggregate chat sessions
        pipeline = [
            {
                "$group": {
                    "_id": "$session_id",
                    "message_count": {"$sum": 1},
                    "first_message": {"$first": "$$ROOT"},
                    "last_message": {"$last": "$$ROOT"}
                }
            },
            {
                "$sort": {"last_message.timestamp": -1}
            }
        ]
        
        sessions = await db.chat_messages.aggregate(pipeline).to_list(1000)
        
        result = []
        for session in sessions:
            result.append({
                "session_id": session["_id"],
                "message_count": session["message_count"],
                "first_message_time": session["first_message"]["timestamp"],
                "last_message_time": session["last_message"]["timestamp"],
                "preview": session["first_message"]["content"][:100]
            })
        
        return {"sessions": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chats/{session_id}")
async def get_chat_session(session_id: str):
    """Get full chat history for a specific session"""
    try:
        messages = await db.chat_messages.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(1000)
        
        return {
            "session_id": session_id,
            "messages": messages
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
