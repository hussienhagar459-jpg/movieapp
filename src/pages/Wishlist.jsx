import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import MovieCard from '../components/MovieCard';
import { Heart, Film, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [filter, setFilter] = useState('all'); // 'all' | 'movie' | 'tv'

  const filteredItems = wishlist.filter(item => {
    if (filter === 'all') return true;
    return item.media_type === filter;
  });

  const movieCount = wishlist.filter(i => i.media_type !== 'tv').length;
  const tvCount = wishlist.filter(i => i.media_type === 'tv').length;

  return (
    <div className="page-container" style={{ paddingTop: '30px' }}>
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-indicator" />
          <h1 className="section-title">My Wishlist ({wishlist.length})</h1>
        </div>

        {wishlist.length > 0 && (
          <div className="tabs-group">
            <button 
              className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({wishlist.length})
            </button>
            <button 
              className={`tab-btn ${filter === 'movie' ? 'active' : ''}`}
              onClick={() => setFilter('movie')}
            >
              Movies ({movieCount})
            </button>
            <button 
              className={`tab-btn ${filter === 'tv' ? 'active' : ''}`}
              onClick={() => setFilter('tv')}
            >
              TV Shows ({tvCount})
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          maxWidth: '600px',
          margin: '40px auto'
        }}>
          <Heart size={54} color="var(--primary)" style={{ marginBottom: '16px', opacity: 0.8 }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Your Wishlist is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Explore our vast collection of movies and TV shows and tap the heart icon to save your favorites here.
          </p>
          <Link to="/" className="btn-primary">
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className="movies-grid">
          {filteredItems.map(item => (
            <MovieCard 
              key={item.id} 
              item={item} 
              mediaType={item.media_type || 'movie'} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
