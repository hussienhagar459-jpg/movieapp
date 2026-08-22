import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { sendMessage } from '../services/ai';
import './AiAssistant.css';

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
        .filter(
          (message) => message.sender !== 'ai' || message.id !== 1
        )
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
    <div className="page-container ai-page">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-indicator" />
          <h1 className="section-title">AI Movie Assistant</h1>
        </div>
      </div>

      <div className="ai-chat-container">

        {/* Chat Header */}
        <div className="ai-chat-header">
          <div className="ai-header-icon">
            <Bot size={22} />
          </div>

          <div>
            <h3>CineBot Assistant</h3>

            <span className="ai-status">
              ● Online • Movie & TV Specialist
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="ai-messages">
          {messages.map((m) => {
            const isUser = m.sender === 'user';

            return (
              <div
                key={m.id}
                className={`ai-message-row ${
                  isUser ? 'user-message' : 'ai-message'
                }`}
              >

                {!isUser && (
                  <div className="ai-avatar">
                    <Bot size={16} color="#fff" />
                  </div>
                )}

                <div
                  className={`ai-message-bubble ${
                    isUser ? 'user-bubble' : 'ai-bubble'
                  }`}
                >
                  {m.text}
                </div>

                {isUser && (
                  <div className="user-avatar">
                    <User size={16} color="var(--text-muted)" />
                  </div>
                )}

              </div>
            );
          })}

          {/* Loading */}
          {loading && (
            <div className="ai-message-row ai-message">
              <div className="ai-avatar">
                <Bot size={16} color="#fff" />
              </div>

              <div className="ai-loading">
                Thinking of recommendations...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="ai-input-form">
          <input
            type="text"
            placeholder="Ask anything about movies or TV shows (e.g. 'Recommend a good sci-fi movie')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
}