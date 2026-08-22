import React from 'react';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" style={{ padding: '30px 60px' }}>
      <div className="footer-content" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Film size={20} color="var(--primary)" fill="var(--primary)" />
          <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem' }}>MovieApp</span>
          <span style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} — Graduation Project</span>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Movies</Link>
          <Link to="/tv" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>TV Shows</Link>
          <Link to="/watchlist" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Wishlist</Link>
          <Link to="/ai-assistant" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>AI Assistant</Link>
        </div>
      </div>
      
      <div style={{ 
        borderTop: '1px solid var(--border-color)', 
        paddingTop: '20px', 
        textAlign: 'center', 
        fontSize: '0.85rem', 
        color: 'var(--text-muted)' 
      }}>
        Powered by TMDB API. Built with React & Vite.
      </div>
    </footer>
  );
}
