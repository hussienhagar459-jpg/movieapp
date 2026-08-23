import React, { useState, useEffect } from 'react';
import tmdbApi from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import HeroBanner from '../components/HeroBanner';

export default function Home() {
  const [activeTab, setActiveTab] = useState('movie');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const data = activeTab === 'movie'
          ? await tmdbApi.getNowPlayingMovies(currentPage)
          : await tmdbApi.getPopularTVShows(currentPage);

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
  }, [activeTab, currentPage]);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div>
      <main className="page-container">
        <HeroBanner />

        <div className="tabs-row">
          <button
            className={`tab-btn ${activeTab === 'movie' ? 'active' : ''}`}
            onClick={() => handleTabChange('movie')}
          >
            Movies
          </button>
          <button
            className={`tab-btn ${activeTab === 'tv' ? 'active' : ''}`}
            onClick={() => handleTabChange('tv')}
          >
            TV Shows
          </button>
        </div>

        <h2 className="section-title">
          {activeTab === 'movie' ? 'Now Playing' : 'Popular TV Shows'}
        </h2>
        
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading {activeTab === 'movie' ? 'movies' : 'TV shows'}...</p>
          </div>
        ) : (
          <>
            <div className="movies-grid" key={activeTab + currentPage}>
              {items.map((item) => (
                <MovieCard 
                  key={item.id} 
                  item={item} 
                  mediaType={activeTab} 
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
