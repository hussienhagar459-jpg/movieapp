import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlay,
  faClock,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function TvHero({ show, onWatchTrailer }) {
  if (!show) return null;

  return (
    <div
      style={{
        width: "100%",
        padding: "50px 32px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        marginBottom: "40px",
        animation: "fadeIn 0.6s ease",
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
        {/* Poster */}
        <img
          src={
            show.poster_path
              ? `${IMAGE_BASE_URL}${show.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={show.name}
          style={{
            width: "280px",
            borderRadius: "16px",
            flexShrink: 0,
            boxShadow: "0 25px 40px rgba(0,0,0,0.85)",
            border: "1px solid rgba(255,255,255,0.15)",
            animation: "slideUp 0.7s ease",
          }}
        />

        {/* Info */}
        <div
          style={{
            flex: "1 1 340px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            animation: "slideRight 0.7s ease",
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: "2.75rem",
              fontWeight: "900",
              margin: 0,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {show.name}{" "}
            <span
              style={{
                color: "#9ca3af",
                fontWeight: "normal",
                fontSize: "1.85rem",
              }}
            >
              ({show.first_air_date?.slice(0, 4) || "N/A"})
            </span>
          </h1>

          {/* Tagline */}
          {show.tagline && (
            <p
              style={{
                color: "#facc15",
                fontStyle: "italic",
                fontSize: "1.15rem",
                margin: 0,
              }}
            >
              "{show.tagline}"
            </p>
          )}

          {/* Meta */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
            }}
          >
            {/* Rating */}
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
                {show.vote_average
                  ? show.vote_average.toFixed(1)
                  : "NR"}
              </span>
            </span>

            {/* Seasons */}
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#e5e7eb",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "0.9rem",
              }}
            >
              {show.number_of_seasons || 0} Seasons
            </span>

            {/* Episodes */}
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
                icon={faClock}
                style={{ color: "#facc15" }}
              />

              <span>
                {show.number_of_episodes || "N/A"} Episodes
              </span>
            </span>

            {/* Status */}
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

              <span>{show.status || "N/A"}</span>
            </span>
          </div>

          {/* Buttons */}
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
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FontAwesomeIcon icon={faPlay} />

              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideRight {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}