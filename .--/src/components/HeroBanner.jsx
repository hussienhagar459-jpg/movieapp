import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="welcome-banner">
      <h1 className="welcome-title">Welcome to our movie app</h1>
      <p className="welcome-subtitle">
        Millions of movies, TV shows and people to discover. Explore now.
      </p>

      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search and explore..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}
