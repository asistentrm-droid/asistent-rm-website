import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';
import { adminFetch } from '../lib/api';

const AdminChats = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const response = await adminFetch(`/api/admin/chats`);
      const data = await response.json();
      setSessions(data.sessions || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading sessions:', error);
      setLoading(false);
    }
  };

  const loadSession = async (sessionId) => {
    try {
      const response = await adminFetch(`/api/admin/chats/${sessionId}`);
      const data = await response.json();
      setMessages(data.messages || []);
      setSelectedSession(sessionId);
    } catch (error) {
      console.error('Error loading session:', error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('sl-SI', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <button onClick={() => navigate('/')} className="back-btn">
          <ArrowLeft size={20} />
          <span>Nazaj</span>
        </button>
        <h1>Zgodovina Pogovorov</h1>
        <button onClick={() => navigate('/admin/setup')} className="btn-primary">
          Uredi Nastavitve
        </button>
      </div>

      <div className="chats-layout">
        <div className="sessions-list">
          <h3>Pogovori ({sessions.length})</h3>
          {loading ? (
            <p className="loading-text">Nalaganje...</p>
          ) : sessions.length === 0 ? (
            <div className="empty-state">
              <MessageCircle size={48} />
              <p>Še ni pogovorov</p>
            </div>
          ) : (
            sessions.map(session => (
              <div
                key={session.session_id}
                className={`session-item ${selectedSession === session.session_id ? 'active' : ''}`}
                onClick={() => loadSession(session.session_id)}
              >
                <div className="session-preview">
                  {session.preview}
                </div>
                <div className="session-meta">
                  <Clock size={14} />
                  <span>{formatDate(session.last_message_time)}</span>
                  <span className="message-count">{session.message_count} sporočil</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="messages-panel">
          {!selectedSession ? (
            <div className="empty-state">
              <MessageCircle size={64} />
              <p>Izberite pogovor za prikaz</p>
            </div>
          ) : (
            <>
              <div className="messages-header">
                <h3>Pogovor</h3>
                <span className="session-id">{selectedSession}</span>
              </div>
              <div className="admin-messages">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`admin-message ${msg.role}`}>
                    <div className="message-timestamp">
                      {formatDate(msg.timestamp)}
                    </div>
                    <div className="message-bubble">
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChats;
