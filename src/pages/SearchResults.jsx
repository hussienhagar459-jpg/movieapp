import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import tmdbApi from "../services/tmdb";
import MovieCard from "../components/TvCard";
import Pagination from "../components/Pagination";
import { Search } from "lucide-react";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";

  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    setSearchInput(query);
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

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
        console.error("Error searching movies:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSearch();
    return () => {
      isMounted = false;
    };
  }, [query, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="page-container" style={{ paddingTop: "30px" }}>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search and explore..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      <h2 className="search-results-title">
        Search Results for: <span>{query}</span>
      </h2>

      {loading && (
        <div
          style={{
            padding: "60px 0",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          Loading movies...
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "70px 20px",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-color)",
            maxWidth: "600px",
            margin: "40px auto",
          }}
        >
          <Search size={55} color="black`" style={{ marginBottom: "16px" }} />
          <h2 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
            No Results Found
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            We couldn't find any movies matching "{query}". Try checking for
            typos or searching for a different title.
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
