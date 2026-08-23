import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  getTvDetails,
  getTvRecommendations,
  getTvReviews,
} from "../services/tmdbApiTvDetails";

import TvHero from "../components/tvDetails/TvHero";
import TvInfo from "../components/tvDetails/TvInfo";
import TvTrailer from "../components/tvDetails/TvTrailer";
import TvCast from "../components/tvDetails/TvCast";
import Recommendations from "../components/tvDetails/Recommendations";
import TvReviews from "../components/tvDetails/TvReviews";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function TvDetails() {
  const { id } = useParams();

  const [tv, setTv] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        const [tvData, recData, revData] = await Promise.all([
          getTvDetails(id),
          getTvRecommendations(id),
          getTvReviews(id),
        ]);

        setTv(tvData);
        setRecommendations(recData.results || []);
        setReviews(revData.results || []);
      } catch (err) {
        setError(err.message || "Failed to load TV show details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllData();
    }
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

  if (error || !tv) {
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
          style={{
            color: "#ef4444",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          ⚠️ {error || "TV show not found"}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#ffffff",
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(11, 15, 25, 0.88),
          rgba(11, 15, 25, 0.98)
        ), url(${
          tv.backdrop_path
            ? `${BACKDROP_BASE_URL}${tv.backdrop_path}`
            : ""
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        paddingBottom: "80px",
      }}
    >
      <TvHero
        tv={tv}
        onWatchTrailer={scrollToTrailer}
      />

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
        <TvInfo tv={tv} />

        <TvTrailer videos={tv.videos} />

        <TvCast cast={tv.credits?.cast} />

        <Recommendations movies={recommendations} />

        <TvReviews reviews={reviews} />
      </div>
    </div>
  );
}