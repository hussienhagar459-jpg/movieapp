import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { sendMessage } from '../services/ai';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'ai',
    text: "Hello! I'm your AI Movie Assistant 🎬. Ask me for movie & TV show recommendations, plot summaries, genres, or actor/director info!",
  },
];

export default function AiAssistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

 const handleSend = async (e) => {
  e.preventDefault();

  if (!input.trim() || loading) return;

  const userText = input.trim();

  const userMsg = {
    id: Date.now(),
    sender: 'user',
    text: userText,
  };

  const updatedMessages = [...messages, userMsg];

  setMessages(updatedMessages);
  setInput('');
  setLoading(true);

  try {
    const conversation = updatedMessages
      .filter((message) => message.sender !== 'ai' || message.id !== 1)
      .map((message) => ({
        role: message.sender === 'user' ? 'user' : 'assistant',
        content: message.text,
      }));

    const aiResponse = await sendMessage(conversation);

    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: aiResponse,
    };

    setMessages((prev) => [...prev, aiMsg]);
  } catch (error) {
    console.error('AI Error:', error);

    const errorMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: 'Sorry, something went wrong while connecting to the AI. Please try again.',
    };

    setMessages((prev) => [...prev, errorMsg]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page-container" style={{ paddingTop: '30px', maxWidth: '900px' }}>
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-indicator" />
          <h1 className="section-title">AI Movie Assistant</h1>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Bot size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>CineBot Assistant</h3>
            <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ● Online • Movie & TV Specialist
            </span>
          </div>
        </div>

        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                {!isUser && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Bot size={16} color="#fff" />
                  </div>
                )}
                <div style={{
                  padding: '12px 18px',
                  borderRadius: '16px',
                  background: isUser ? 'var(--primary)' : '#f9fafb',
                  color: '#000',
                  border: isUser ? 'none' : '1px solid #d1d5db',
                  lineHeight: '1.5',
                  fontSize: '0.95rem'
                }}>
                  {m.text}
                </div>
                {isUser && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-card-hover)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <User size={16} color="var(--text-muted)" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={16} color="#fff" />
              </div>
              <div style={{
                padding: '10px 16px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.07)',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
              }}>
                Thinking of recommendations...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} style={{
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            placeholder="Ask anything about movies or TV shows (e.g. 'Recommend a good sci-fi movie')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              background: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: 'var(--radius-full)',
              padding: '12px 20px',
              color: '#000',
              outline: 'none',
              fontSize: '0.95rem'
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            style={{
              padding: '0 20px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: '#fff',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontWeight: 600,
              opacity: (!input.trim() || loading) ? 0.5 : 1
            }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
