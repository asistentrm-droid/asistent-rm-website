import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import '../styles/ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      setMessages([{
        role: 'assistant',
        content: 'Pozdravljeni! 👋 Sem AI asistent Asistent RM. Kako vam lahko pomagam?',
        timestamp: new Date().toISOString()
      }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          session_id: sessionId
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        streaming: true
      }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsLoading(false);
              setMessages(prev => prev.map((msg, idx) => 
                idx === prev.length - 1 ? { ...msg, streaming: false } : msg
              ));
            } else if (data.startsWith('[ERROR]')) {
              console.error('Streaming error:', data);
              setIsLoading(false);
            } else {
              assistantMessage += data;
              setMessages(prev => prev.map((msg, idx) => 
                idx === prev.length - 1 ? { ...msg, content: assistantMessage } : msg
              ));
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Oprostite, prišlo je do napake. Prosim, poskusite znova.',
        timestamp: new Date().toISOString()
      }]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chat-bubble"
          onClick={() => setIsOpen(true)}
          aria-label="Odpri chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-avatar">
                <img 
                  src="https://customer-assets-7cd3h4nn.emergentagent.net/job_ai-secretary-22/artifacts/odsnkb1u_Rm-logo-removebg-preview.png" 
                  alt="Asistent RM" 
                />
              </div>
              <div>
                <h3>Asistent RM</h3>
                <p>AI Asistent</p>
              </div>
            </div>
            <button 
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Zapri chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
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
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Vpišite sporočilo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Pošlji sporočilo"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
