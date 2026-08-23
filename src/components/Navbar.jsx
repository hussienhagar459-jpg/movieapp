import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            Movie App
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/watchlist" className="nav-wishlist-btn">
            <Heart size={20} color="#111827" strokeWidth={2} />
            <span>Wishlist</span>
          </Link>

          <Link to="/ai-assistant" className="nav-ai-btn">
            AI Assistant
          </Link>
        </div>
      </div>
    </header>
  );
}