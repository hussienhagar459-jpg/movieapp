import React, { useState, useEffect } from "react";
import tmdbApi from "../services/tmdb";
import MovieCard from "../components/TvCard";
import Pagination from "../components/Pagination";

export default function TvShows() {
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadShows() {
      setLoading(true);
      try {
        const data = await tmdbApi.getPopularTVShows(currentPage);
        if (isMounted && data) {
          setShows(data.results || []);
          setTotalPages(data.total_pages || 1);
        }
      } catch (err) {
        console.error("Error fetching TV shows:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadShows();
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return (
    <div className="page-container" style={{ paddingTop: "30px" }}>
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-indicator" />
          <h1 className="section-title">Popular TV Shows</h1>
        </div>
      </div>

      {loading && (
        <div className="loading-grid">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="skeleton-card" />
          ))}
        </div>
      )}

      {!loading && (
        <>
          <div className="movies-grid">
            {shows.map((show) => (
              <MovieCard key={show.id} item={show} mediaType="tv" />
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
