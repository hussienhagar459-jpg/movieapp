import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            Movie App
          </Link>

          <nav className="nav-links">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === '/' ? 'active' : ''
              }`}
            >
              Movies
            </Link>
          </nav>
        </div>

        <div className="nav-actions">
          <div className="nav-lang">
            <span>En</span>
            <ChevronDown size={14} />
          </div>

          <Link to="/ai-assistant" className="nav-ai-btn">
            AI Assistant
          </Link>
        </div>
      </div>
    </header>
  );
}