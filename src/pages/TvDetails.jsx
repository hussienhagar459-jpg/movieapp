import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi, { BACKDROP_BASE_URL, IMAGE_BASE_URL } from '../services/tmdb';
import { Star, ArrowLeft, Tv } from 'lucide-react';

export default function TvDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetails() {
      setLoading(true);
      try {
        const data = await tmdbApi.getTVShowDetails(id);
        if (isMounted) setShow(data);
      } catch (err) {
        console.error('Error fetching TV show details:', err);
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
        <p style={{ color: 'var(--text-muted)' }}>Loading TV show details...</p>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="page-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>TV Show not found</h2>
        <Link to="/tv" className="btn-primary" style={{ marginTop: '20px' }}>
          Back to TV Shows
        </Link>
      </div>
    );
  }

  const backdropUrl = show.backdrop_path ? `${BACKDROP_BASE_URL}${show.backdrop_path}` : null;
  const posterUrl = show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : null;

  return (
    <div>
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
              alt={show.name} 
              style={{ width: '220px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }} 
            />
          )}

          <div style={{ flex: 1, minWidth: '280px' }}>
            <Link to="/tv" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <ArrowLeft size={16} /> Back to TV Shows
            </Link>
            <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>{show.name}</h1>
            
            <div className="hero-meta">
              <span className="hero-rating">
                <Star size={18} fill="currentColor" />
                {show.vote_average?.toFixed(1)} ({show.vote_count} votes)
              </span>
              {show.first_air_date && <span>• {show.first_air_date}</span>}
              {show.number_of_seasons && <span>• {show.number_of_seasons} Seasons</span>}
            </div>

            <p className="hero-overview" style={{ WebkitLineClamp: 'unset' }}>{show.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
