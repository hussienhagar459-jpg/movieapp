import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlay,
  faHeart,
  faClock,
  faCircleCheck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

// TMDB Poster Base URL
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieHero({ movie, onWatchTrailer }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check if current movie already exists in localStorage Wishlist
  useEffect(() => {
    if (!movie) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlist.some((item) => item.id === movie.id));
  }, [movie]);

  // Toggle Add / Remove from Wishlist
  const toggleWishlist = () => {
    if (!movie) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== movie.id);
      setIsInWishlist(false);
    } else {
      updatedWishlist = [...wishlist, movie];
      setIsInWishlist(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    // Dispatch custom event to notify Navbar / Wishlist page
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (!movie) return null;

  return (
    // Hero Banner Container
    <div
      style={{
        width: "100%",
        padding: "50px 32px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* Movie Poster */}
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={movie.title}
          style={{
            width: "280px",
            borderRadius: "16px",
            flexShrink: 0,
            boxShadow: "0 25px 40px rgba(0,0,0,0.85)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />

        {/* Hero Info Column */}
        <div
          style={{
            flex: "1 1 340px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <h1
            style={{
              fontSize: "2.75rem",
              fontWeight: "900",
              margin: 0,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {movie.title}{" "}
            <span
              style={{
                color: "#9ca3af",
                fontWeight: "normal",
                fontSize: "1.85rem",
              }}
            >
              ({movie.release_date?.slice(0, 4) || "N/A"})
            </span>
          </h1>

          {movie.tagline && (
            <p
              style={{
                color: "#facc15",
                fontStyle: "italic",
                fontSize: "1.15rem",
                margin: 0,
              }}
            >
              "{movie.tagline}"
            </p>
          )}

          {/* Badges Row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "#facc15",
                color: "#111827",
                fontWeight: "bold",
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FontAwesomeIcon icon={faStar} />
              <span>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
              </span>
            </span>

            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#e5e7eb",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FontAwesomeIcon icon={faClock} style={{ color: "#facc15" }} />
              <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
            </span>

            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#e5e7eb",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#4ade80" }}
              />
              <span>{movie.status || "Released"}</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "12px",
            }}
          >
            <button
              onClick={onWatchTrailer}
              style={{
                backgroundColor: "#facc15",
                color: "#111827",
                fontWeight: "800",
                padding: "14px 28px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1rem",
                boxShadow: "0 6px 20px rgba(250, 204, 21, 0.4)",
              }}
            >
              <FontAwesomeIcon icon={faPlay} style={{ color: "#111827" }} />
              <span>Watch Trailer</span>
            </button>

            {/* Functional Wishlist Button */}
            <button
              onClick={toggleWishlist}
              style={{
                backgroundColor: isInWishlist
                  ? "rgba(239, 68, 68, 0.2)"
                  : "rgba(255,255,255,0.12)",
                color: isInWishlist ? "#f87171" : "#fff",
                fontWeight: "600",
                padding: "14px 28px",
                borderRadius: "12px",
                border: isInWishlist
                  ? "1px solid rgba(239, 68, 68, 0.5)"
                  : "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1rem",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <FontAwesomeIcon
                icon={isInWishlist ? faCheck : faHeart}
                style={{ color: isInWishlist ? "#4ade80" : "#ef4444" }}
              />
              <span>{isInWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
