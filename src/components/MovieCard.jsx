import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MoreHorizontal } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { IMAGE_BASE_URL } from '../services/tmdb';

export default function MovieCard({ item, mediaType = 'movie' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  if (!item) return null;

  const inWishlist = isInWishlist(item.id);
  const title = item.title || item.name || 'Untitled';
  const releaseDateRaw = item.release_date || item.first_air_date;
  
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };
  const formattedDate = formatDate(releaseDateRaw);
  
  const ratingPercent = item.vote_average ? Math.round(item.vote_average * 10) : 0;
  
  const posterUrl = item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : null;
  const itemType = item.media_type || mediaType;
  const detailLink = itemType === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`;

  const handleWishlistClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    toggleWishlist(item, itemType);
  };

  return (
    <div className="movie-card">
      <div className="card-poster-wrapper">
        <Link to={detailLink} style={{ display: 'block', width: '100%', height: '100%' }}>
          {posterUrl ? (
            <img 
              src={posterUrl} 
              alt={title} 
              className="card-poster" 
              loading="lazy" 
            />
          ) : (
            <div className="card-poster" style={{ background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
              No Image
            </div>
          )}
        </Link>
        
        <button className="card-options-btn" aria-label="More options">
          <MoreHorizontal size={16} />
        </button>

        <div className="card-rating">
          {ratingPercent}<span>%</span>
        </div>
      </div>

      <div className="card-info-row">
        <div className="card-text-col">
          <Link to={detailLink}>
            <h3 className="card-title" title={title}>
              {title}
            </h3>
          </Link>
          <span className="card-date">{formattedDate}</span>
        </div>
        
        <button 
          className={`card-wishlist-btn ${inWishlist ? 'in-wishlist' : ''}`}
          onClick={handleWishlistClick}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            size={18} 
            fill={inWishlist ? 'var(--primary)' : 'none'} 
            color={inWishlist ? 'var(--primary)' : 'currentColor'}
          />
        </button>
      </div>
    </div>
  );
}
