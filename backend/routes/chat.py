import asyncio
import json
import logging
import os
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from knowledge import SYSTEM_PROMPT, fallback_answer

try:  # Paket je na voljo na platformi Emergent; brez njega chatbot uporabi rezervne odgovore.
    from emergentintegrations.llm.chat import LlmChat, UserMessage
except ImportError:  # pragma: no cover
    LlmChat = None
    UserMessage = None

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["chat"])

# MongoDB connection (will be injected from main app)
db = None

HISTORY_LIMIT = 12  # koliko prejšnjih sporočil pošljemo modelu kot kontekst


def set_db(database):
    global db
    db = database


def _model_candidates():
    """Model iz okolja (CHAT_MODEL_PROVIDER / CHAT_MODEL), nato stabilne rezerve."""
    configured = (
        os.environ.get("CHAT_MODEL_PROVIDER", "gemini"),
        os.environ.get("CHAT_MODEL", "gemini-2.5-flash"),
    )
    candidates = [configured, ("gemini", "gemini-2.5-flash"), ("gemini", "gemini-3.1-pro-preview"), ("openai", "gpt-4o-mini")]
    seen, result = set(), []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            result.append(c)
    return result


class ChatMessageRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: str = Field(..., min_length=8, max_length=100, pattern=r"^[A-Za-z0-9_\-]+$")


async def _company_extra():
    """Dodatni podatki, vneseni v /admin/setup (če obstajajo)."""
    try:
        data = await db.company_data.find_one({}, {"_id": 0})
    except Exception:  # noqa: BLE001
        logger.exception("Branje company_data ni uspelo")
        return ""
    if not data:
        return ""
    labels = {
        "basic_info": "Osnovne informacije",
        "services": "Storitve",
        "faq": "Pogosta vprašanja",
        "working_hours": "Delovni čas",
        "demo_info": "Demo",
        "other_info": "Drugo",
    }
    parts = [f"{label}: {data[key]}" for key, label in labels.items() if data.get(key)]
    if not parts:
        return ""
    return (
        "\nDODATNI PODATKI OD EKIPE (če so v nasprotju s cenikom zgoraj, velja cenik zgoraj):\n"
        + "\n".join(parts)
    )


async def _history_text(session_id: str) -> str:
    try:
        previous = (
            await db.chat_messages.find({"session_id": session_id}, {"_id": 0, "role": 1, "content": 1})
            .sort("timestamp", -1)
            .to_list(HISTORY_LIMIT)
        )
    except Exception:  # noqa: BLE001
        logger.exception("Branje zgodovine ni uspelo")
        return ""
    if not previous:
        return ""
    lines = []
    for m in reversed(previous):
        who = "Obiskovalec" if m.get("role") == "user" else "Asistent"
        lines.append(f"{who}: {m.get('content', '')}")
    return "Dosedanji pogovor:\n" + "\n".join(lines) + "\n\n"


async def _ask_llm(session_id: str, system: str, prompt: str):
    """Vrne (odgovor, uporabljen_model) ali (None, None), če model ni na voljo."""
    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if LlmChat is None or not api_key:
        logger.warning("Chat LLM ni nastavljen (manjka emergentintegrations ali EMERGENT_LLM_KEY) – rezervni odgovor.")
        return None, None

    for provider, model in _model_candidates():
        try:
            chat = LlmChat(
                api_key=api_key,
                session_id=f"{session_id}-{uuid.uuid4().hex[:8]}",
                system_message=system,
            ).with_model(provider, model)
            text = await asyncio.wait_for(chat.send_message(UserMessage(text=prompt)), timeout=45)
            if text and str(text).strip():
                return str(text).strip(), f"{provider}/{model}"
        except Exception:  # noqa: BLE001
            logger.exception("Model %s/%s ni odgovoril", provider, model)
    return None, None


def _sse(payload: dict) -> str:
    return f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"


@router.post("/send")
async def send_message(request: ChatMessageRequest):
    """Sprejme sporočilo in vrne odgovor kot SSE tok (JSON delčki, nato {"done": true})."""
    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=422, detail="Prazno sporočilo")

    history = await _history_text(request.session_id)

    try:
        await db.chat_messages.insert_one({
            "id": str(uuid.uuid4()),
            "session_id": request.session_id,
            "role": "user",
            "content": message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        })
    except Exception:  # noqa: BLE001
        logger.exception("Shranjevanje sporočila ni uspelo")

    system = SYSTEM_PROMPT + await _company_extra()
    prompt = f"{history}Novo sporočilo obiskovalca: {message}" if history else message

    async def generate():
        answer, model_used = await _ask_llm(request.session_id, system, prompt)
        if answer is None:
            answer, model_used = fallback_answer(message), "fallback"

        try:
            await db.chat_messages.insert_one({
                "id": str(uuid.uuid4()),
                "session_id": request.session_id,
                "role": "assistant",
                "content": answer,
                "model": model_used,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            })
        except Exception:  # noqa: BLE001
            logger.exception("Shranjevanje odgovora ni uspelo")

        # Postopen izpis po besedah (presledki in nove vrstice ostanejo ohranjeni).
        words = answer.split(" ")
        for i, word in enumerate(words):
            yield _sse({"t": word + (" " if i < len(words) - 1 else "")})
            await asyncio.sleep(0.02)
        yield _sse({"done": True})

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@router.get("/health")
async def chat_health():
    """Hitro preverjanje: ali je jezikovni model nastavljen."""
    return {
        "llm_package": LlmChat is not None,
        "llm_key": bool(os.environ.get("EMERGENT_LLM_KEY")),
        "models": [f"{p}/{m}" for p, m in _model_candidates()],
    }
