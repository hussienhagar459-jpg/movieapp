import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronDown } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { wishlistCount } = useWishlist();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          Movie App
        </Link>

        <div className="nav-actions">
          <div className="nav-lang">
            <span>En</span>
            <ChevronDown size={14} />
          </div>

          <Link to="/watchlist" className="nav-wishlist-btn">
            <Heart 
              size={20} 
              fill={wishlistCount > 0 ? "currentColor" : "currentColor"}
              color="#111827"
              strokeWidth={wishlistCount > 0 ? 0 : 2}
            />
            <span>watchlist</span>
          </Link>

          <Link to="/ai-assistant" className="nav-ai-btn">
            AI Assistant
          </Link>
        </div>
      </div>
    </header>
  );
}
