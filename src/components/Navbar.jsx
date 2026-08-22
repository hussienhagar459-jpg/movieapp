import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            Movie App
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/ai-assistant" className="nav-ai-btn">
            AI Assistant
          </Link>
        </div>
      </div>
    </header>
  );
}