import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdbApi from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { Search, Film } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    let isMounted = true;
    async function fetchSearch() {
      setLoading(true);
      try {
        const data = await tmdbApi.searchMovies(query, currentPage);
        if (isMounted && data) {
          setResults(data.results || []);
          setTotalPages(data.total_pages || 1);
        }
      } catch (err) {
        console.error('Error searching movies:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSearch();
    return () => {
      isMounted = false;
    };
  }, [query, currentPage]);

  return (
    <div className="page-container" style={{ paddingTop: '30px' }}>
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-indicator" />
          <h1 className="section-title">
            Search Results for: <span style={{ color: 'var(--primary)' }}>"{query}"</span>
          </h1>
        </div>
      </div>

      {loading && (
        <div className="loading-grid">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="skeleton-card" />
          ))}
        </div>
      )}

      {!loading && results.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          maxWidth: '600px',
          margin: '40px auto'
        }}>
          <Search size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No Results Found</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            We couldn't find any movies matching "{query}". Try checking for typos or searching for a different title.
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="movies-grid">
            {results.map((item) => (
              <MovieCard key={item.id} item={item} mediaType="movie" />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}
