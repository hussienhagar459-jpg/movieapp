import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faStar } from "@fortawesome/free-solid-svg-icons";

// TMDB Poster Base URL
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Recommendations({ movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    // Horizontal Scroll Recommendations Section
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "1.6rem",
          fontWeight: "bold",
          color: "#facc15",
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#facc15" }} />
        <span>More Like This</span>
      </h2>

      {/* Horizontal Scrollable Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "14px",
        }}
      >
        {movies.slice(0, 15).map((item) => (
          <Link
            key={item.id}
            to={`/movie/${item.id}`}
            style={{
              flex: "0 0 190px",
              textDecoration: "none",
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = "#facc15";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
            }}
          >
            {/* Movie Poster */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "2/3",
                backgroundColor: "#000",
              }}
            >
              <img
                src={
                  item.poster_path
                    ? `${IMAGE_BASE_URL}${item.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Poster"
                }
                alt={item.title || item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Rating Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  color: "#facc15",
                  padding: "3px 7px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <FontAwesomeIcon icon={faStar} />
                <span>
                  {item.vote_average ? item.vote_average.toFixed(1) : "NR"}
                </span>
              </div>
            </div>

            {/* Movie Title & Year */}
            <div
              style={{
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <h4
                style={{
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title || item.name}
              </h4>
              <p style={{ color: "#9ca3af", fontSize: "0.75rem", margin: 0 }}>
                {(item.release_date || item.first_air_date)?.slice(0, 4) ||
                  "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
