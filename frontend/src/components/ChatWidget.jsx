import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { API_BASE } from '../lib/api';
import { company } from '../data/site';
import '../styles/ChatWidget.css';

const SESSION_KEY = 'asistentrm_chat_session';
const SUGGESTIONS = ['Koliko stane?', 'Kako poteka vzpostavitev?', 'Ali res govori slovensko?'];
const WELCOME = {
  role: 'assistant',
  content: 'Pozdravljeni! 👋 Sem spletni asistent Asistent RM. Vprašajte me o cenah, delovanju ali vzpostavitvi.',
};
const ERROR_TEXT =
  `Oprostite, trenutno ne morem odgovoriti. Pišite nam na ${company.email} ali pokličite demo linijo ${company.demoPhone}.`;

const newSessionId = () => `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

const getSessionId = () => {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = newSessionId();
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return newSessionId();
  }
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sessionIdRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  if (sessionIdRef.current === null) sessionIdRef.current = getSessionId();

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const updateLast = (updater) =>
    setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? updater(m) : m)));

  const sendMessage = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    let started = false;
    let answer = '';
    try {
      const response = await fetch(`${API_BASE}/api/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.slice(0, 2000), session_id: sessionIdRef.current }),
      });
      if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE dogodki so ločeni s prazno vrstico; zadnji (nepopoln) del ostane v bufferju.
        const events = buffer.split('\n\n');
        buffer = events.pop();
        for (const evt of events) {
          const line = evt.split('\n').find((l) => l.startsWith('data: '));
          if (!line) continue;
          let payload;
          try { payload = JSON.parse(line.slice(6)); } catch { continue; }
          if (payload.done) { done = true; break; }
          if (typeof payload.t === 'string') {
            answer += payload.t;
            if (!started) {
              started = true;
              setMessages((prev) => [...prev, { role: 'assistant', content: answer, streaming: true }]);
            } else {
              const current = answer;
              updateLast((m) => ({ ...m, content: current }));
            }
          }
        }
      }

      if (!answer.trim()) throw new Error('Prazen odgovor');
      updateLast((m) => ({ ...m, streaming: false }));
    } catch (error) {
      console.error('Chat error:', error);
      if (started) {
        updateLast((m) => ({ ...m, streaming: false, content: m.content || ERROR_TEXT }));
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: ERROR_TEXT, error: true }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showSuggestions = messages.length === 1 && !isLoading;

  return (
    <>
      {!isOpen && (
        <button className="chat-bubble" onClick={() => setIsOpen(true)} aria-label="Odpri klepet z asistentom">
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chat-widget" role="dialog" aria-label="Klepet z Asistent RM">
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-avatar">
                <img src="/logo.png" alt="" width="40" height="30" />
              </div>
              <div>
                <h3>Asistent RM</h3>
                <p>Spletni AI asistent · odgovori takoj</p>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Zapri klepet">
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages" ref={listRef} aria-live="polite">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <div className="message-content">
                  {msg.content}
                  {msg.streaming && <span className="streaming-cursor">▋</span>}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="chat-message assistant">
                <div className="message-content typing-indicator" aria-label="Asistent piše">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            {showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="chat-suggestion" onClick={() => sendMessage(s)}>{s}</button>
                ))}
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <label htmlFor="chat-input" className="sr-only">Vaše sporočilo</label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Vpišite vprašanje …"
              value={input}
              maxLength={2000}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              aria-label="Pošlji sporočilo"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="chat-disclaimer">Odgovore pripravlja umetna inteligenca. Pogovor shranimo za izboljšanje storitve.</p>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
