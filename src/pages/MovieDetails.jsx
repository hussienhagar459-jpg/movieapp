import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi, { IMAGE_BASE_URL } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Heart, ExternalLink } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function MovieDetails() {
  const { id } = useParams();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetails() {
      setLoading(true);
      try {
        const [detailsData, recsData] = await Promise.all([
          tmdbApi.getMovieDetails(id),
          tmdbApi.getMovieRecommendations(id).catch(() => ({ results: [] })),
        ]);

        if (isMounted) {
          setMovie(detailsData);
          setRecommendations(recsData.results?.slice(0, 10) || []);
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
        <p style={{ color: '#666' }}>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="page-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#000' }}>Movie not found</h2>
        <Link to="/" className="search-btn" style={{ marginTop: '20px', display: 'inline-block', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(movie.id);
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/400x600';
  
  const language = movie.spoken_languages && movie.spoken_languages.length > 0 
    ? movie.spoken_languages[0].english_name 
    : movie.original_language;

  const studio = movie.production_companies && movie.production_companies.length > 0 
    ? movie.production_companies[0] 
    : null;

  return (
    <div className="page-container" style={{ padding: '40px', background: '#fff' }}>
      
      <div style={{ display: 'flex', gap: '40px', marginBottom: '60px', flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0 }}>
          <img 
            src={posterUrl} 
            alt={movie.title} 
            style={{ 
              width: '400px', 
              borderRadius: '20px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              objectFit: 'cover'
            }} 
          />
        </div>

        <div style={{ flex: 1, minWidth: '300px', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#000', margin: 0 }}>
              {movie.title}
            </h1>
            <button 
              onClick={() => toggleWishlist(movie, 'movie')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
            >
              <Heart size={32} fill={inWishlist ? 'var(--primary)' : 'none'} color={inWishlist ? 'var(--primary)' : '#ccc'} />
            </button>
          </div>

          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '16px' }}>
            {movie.release_date ? movie.release_date : 'Unknown Date'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4].map(i => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#000">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span style={{ fontSize: '1.1rem', color: '#666' }}>{movie.vote_count}</span>
          </div>

          <p style={{ 
            color: '#333', 
            fontSize: '1.2rem', 
            lineHeight: '1.6', 
            marginBottom: '32px',
            maxWidth: '800px'
          }}>
            {movie.overview}
          </p>

          {movie.genres && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {movie.genres.map(g => (
                <span key={g.id} style={{
                  padding: '8px 24px',
                  background: 'var(--primary)',
                  color: '#000',
                  borderRadius: '30px',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', alignItems: 'center' }}>
            <div style={{ fontSize: '1.1rem' }}>
              <span style={{ fontWeight: 'bold', color: '#000', marginRight: '8px' }}>Duration:</span>
              <span style={{ color: '#555' }}>{movie.runtime} Min.</span>
            </div>
            <div style={{ fontSize: '1.1rem' }}>
              <span style={{ fontWeight: 'bold', color: '#000', marginRight: '8px' }}>Languages:</span>
              <span style={{ color: '#555' }}>{language}</span>
            </div>
          </div>

          {studio && (
            <div style={{ marginBottom: '40px' }}>
              {studio.logo_path ? (
                <img 
                  src={`${IMAGE_BASE_URL}${studio.logo_path}`} 
                  alt={studio.name} 
                  style={{ maxHeight: '40px', objectFit: 'contain' }} 
                />
              ) : (
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>{studio.name}</span>
              )}
            </div>
          )}

          {movie.homepage && (
            <a 
              href={movie.homepage} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                border: '1px solid #e5e7eb',
                borderRadius: '30px',
                color: '#555',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Website <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {recommendations.length > 0 && (
        <section>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#000', marginBottom: '30px' }}>
            Recommendations
          </h2>
          <div className="movies-grid">
            {recommendations.map(rec => (
              <MovieCard key={rec.id} item={rec} mediaType="movie" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
