import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieRecommendations,
  getMovieReviews,
} from "../services/tmdbApiMovieDetails";

import MovieHero from "../components/movieDetails/MovieHero";
import MovieInfo from "../components/movieDetails/MovieInfo";
import MovieTrailer from "../components/movieDetails/MovieTrailer";
import MovieCast from "../components/movieDetails/MovieCast";
import Recommendations from "../components/movieDetails/Recommendations";
import MovieReviews from "../components/movieDetails/MovieReviews";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });

        const [movieData, recData, revData] = await Promise.all([
          getMovieDetails(id),
          getMovieRecommendations(id),
          getMovieReviews(id),
        ]);

        setMovie(movieData);
        setRecommendations(recData.results || []);
        setReviews(revData.results || []);
      } catch (err) {
        setError(err.message || "Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAllData();
  }, [id]);

  const scrollToTrailer = () => {
    document
      .getElementById("trailer-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0b0f19",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "45px",
            height: "45px",
            border: "4px solid #facc15",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0b0f19",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <p
          style={{ color: "#ef4444", fontSize: "1.25rem", fontWeight: "bold" }}
        >
          ⚠️ {error || "Movie not found"}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#ffffff",
        backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 25, 0.88), rgba(11, 15, 25, 0.98)), url(${
          movie.backdrop_path
            ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
            : ""
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        paddingBottom: "80px",
      }}
    >
      <MovieHero movie={movie} onWatchTrailer={scrollToTrailer} />

      {/* Full-Width Padded Sections Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1350px",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          gap: "60px",
        }}
      >
        <MovieInfo movie={movie} />
        <MovieTrailer videos={movie.videos} />
        <MovieCast cast={movie.credits?.cast} />
        <Recommendations movies={recommendations} />
        <MovieReviews reviews={reviews} />
      </div>
    </div>
  );
}
