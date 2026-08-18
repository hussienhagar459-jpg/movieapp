import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi, { BACKDROP_BASE_URL, IMAGE_BASE_URL } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Star, Calendar, Clock, Heart, ArrowLeft, MessageSquare } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function MovieDetails() {
  const { id } = useParams();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetails() {
      setLoading(true);
      try {
        const [detailsData, recsData, reviewsData] = await Promise.all([
          tmdbApi.getMovieDetails(id),
          tmdbApi.getMovieRecommendations(id).catch(() => ({ results: [] })),
          tmdbApi.getMovieReviews(id).catch(() => ({ results: [] })),
        ]);

        if (isMounted) {
          setMovie(detailsData);
          setRecommendations(recsData.results?.slice(0, 8) || []);
          setReviews(reviewsData.results || []);
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="page-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Movie not found</h2>
        <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(movie.id);
  const backdropUrl = movie.backdrop_path ? `${BACKDROP_BASE_URL}${movie.backdrop_path}` : null;
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null;

  return (
    <div>
      {/* Movie Hero Header */}
      <div className="hero-banner" style={{ minHeight: '480px' }}>
        {backdropUrl && (
          <div 
            className="hero-backdrop" 
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}
        <div className="hero-overlay" />
        
        <div className="hero-content" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {posterUrl && (
            <img 
              src={posterUrl} 
              alt={movie.title} 
              style={{ width: '220px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }} 
            />
          )}

          <div style={{ flex: 1, minWidth: '280px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <ArrowLeft size={16} /> Back to Movies
            </Link>
            <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>{movie.title}</h1>
            
            <div className="hero-meta">
              <span className="hero-rating">
                <Star size={18} fill="currentColor" />
                {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)
              </span>
              {movie.release_date && <span>• {movie.release_date}</span>}
              {movie.runtime && <span>• {movie.runtime} min</span>}
            </div>

            {movie.genres && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {movie.genres.map(g => (
                  <span key={g.id} style={{
                    padding: '4px 12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem'
                  }}>
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="hero-overview" style={{ WebkitLineClamp: 'unset' }}>{movie.overview}</p>

            <button 
              className="btn-primary"
              onClick={() => toggleWishlist(movie, 'movie')}
            >
              <Heart 
                size={18} 
                fill={inWishlist ? 'currentColor' : 'none'} 
              />
              <span>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Recommended Movies */}
        {recommendations.length > 0 && (
          <section style={{ marginBottom: '50px' }}>
            <div className="section-header">
              <div className="section-title-group">
                <div className="section-indicator" />
                <h2 className="section-title">Recommended Movies</h2>
              </div>
            </div>
            <div className="movies-grid">
              {recommendations.map(rec => (
                <MovieCard key={rec.id} item={rec} mediaType="movie" />
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section>
          <div className="section-header">
            <div className="section-title-group">
              <div className="section-indicator" />
              <h2 className="section-title">Reviews ({reviews.length})</h2>
            </div>
          </div>
          
          {reviews.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No reviews yet for this movie.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reviews.map(review => (
                <div key={review.id} style={{
                  background: 'var(--bg-card)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <MessageSquare size={16} color="var(--primary)" />
                    <strong>{review.author}</strong>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {review.content.slice(0, 400)}{review.content.length > 400 ? '...' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
