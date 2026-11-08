import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { company } from '../data/site';
import '../styles/ChatWidget.css';

// Vercel funkcija (frontend/api/chat.js) na isti domeni; po želji jo preusmerite z REACT_APP_CHAT_URL.
const CHAT_ENDPOINT = process.env.REACT_APP_CHAT_URL || '/api/chat';
const SUGGESTIONS = ['Koliko stane?', 'Kako poteka vzpostavitev?', 'Ali res govori slovensko?'];
const WELCOME = {
  role: 'assistant',
  content: 'Pozdravljeni! 👋 Sem spletni asistent Asistent RM. Vprašajte me o cenah, delovanju ali vzpostavitvi.',
};
const ERROR_TEXT =
  `Oprostite, trenutno ne morem odgovoriti. Pišite nam na ${company.email} ali pokličite demo linijo ${company.demoPhone}.`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return undefined;
    if (inputRef.current) inputRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const updateLast = (updater) =>
    setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? updater(m) : m)));

  const sendMessage = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    // Zgodovina (brez pozdrava in sporočil o napaki) za kontekst pogovora.
    const history = messages
      .filter((m, i) => i > 0 && !m.error && m.content)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.slice(0, 2000), history }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const answer = typeof data.answer === 'string' ? data.answer.trim() : '';
      if (!answer) throw new Error('Prazen odgovor');

      // Postopen izpis po besedah.
      setMessages((prev) => [...prev, { role: 'assistant', content: '', streaming: true }]);
      const words = answer.split(' ');
      for (let i = 1; i <= words.length; i += 1) {
        const partial = words.slice(0, i).join(' ');
        updateLast((m) => ({ ...m, content: partial }));
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 18));
      }
      updateLast((m) => ({ ...m, content: answer, streaming: false }));
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: ERROR_TEXT, error: true }]);
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
          <p className="chat-disclaimer">Odgovore pripravlja umetna inteligenca. Ne vpisujte osebnih podatkov.</p>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
