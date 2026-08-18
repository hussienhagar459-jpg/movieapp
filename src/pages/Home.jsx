import React, { useState, useEffect } from 'react';
import tmdbApi from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import HeroBanner from '../components/HeroBanner';

export default function Home() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const data = await tmdbApi.getNowPlayingMovies(currentPage);
        if (isMounted && data) {
          const results = data.results || [];
          setItems(results.slice(0, 12));
          setTotalPages(data.total_pages || 1);
        }
      } catch (err) {
        console.error('Error fetching data from TMDB:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return (
    <div>
      <main className="page-container">
        <HeroBanner />

        <h2 className="section-title">Now Playing</h2>
        
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading movies...
          </div>
        ) : (
          <>
            <div className="movies-grid">
              {items.map((item) => (
                <MovieCard 
                  key={item.id} 
                  item={item} 
                  mediaType="movie" 
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </main>
    </div>
  );
}
