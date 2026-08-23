import React from 'react';
import { Film, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Film size={20} color="var(--primary)" />
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>MovieApp</span>
          <span>© {new Date().getFullYear()} — Graduation Project</span>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}>Movies</Link>
          <Link to="/tv" style={{ color: 'var(--text-muted)' }}>TV Shows</Link>
          <Link to="/ai-assistant" style={{ color: 'var(--text-muted)' }}>AI Assistant</Link>
        </div>

        <div className="footer-attribution">
          Powered by TMDB API. Built with React & Vite.
        </div>
      </div>
    </footer>
  );
}
