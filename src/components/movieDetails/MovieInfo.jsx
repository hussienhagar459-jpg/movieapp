import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faTags,
  faMoneyBillWave,
  faChartLine,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

export default function MovieInfo({ movie }) {
  if (!movie) return null;

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "20px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      {/* Storyline */}
      <div>
        <h2
          style={{
            fontSize: "1.45rem",
            fontWeight: "bold",
            color: "#facc15",
            margin: "0 0 12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FontAwesomeIcon icon={faBookOpen} />
          <span>Storyline</span>
        </h2>
        <p
          style={{
            color: "#d1d5db",
            lineHeight: 1.75,
            fontSize: "1.05rem",
            margin: 0,
          }}
        >
          {movie.overview || "No description available for this movie."}
        </p>
      </div>

      {/* Genres */}
      {movie.genres && movie.genres.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#9ca3af",
              margin: "0 0 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FontAwesomeIcon icon={faTags} />
            <span>Genres</span>
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                style={{
                  backgroundColor: "rgba(250, 204, 21, 0.12)",
                  color: "#facc15",
                  border: "1px solid rgba(250, 204, 21, 0.35)",
                  padding: "6px 16px",
                  borderRadius: "10px",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                }}
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              backgroundColor: "rgba(250, 204, 21, 0.12)",
              padding: "14px",
              borderRadius: "14px",
              color: "#facc15",
            }}
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ fontSize: "1.3rem" }}
            />
          </div>
          <div>
            <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: 0 }}>
              Release Date
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#fff",
                margin: "2px 0 0",
              }}
            >
              {movie.release_date || "N/A"}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              backgroundColor: "rgba(74, 222, 128, 0.12)",
              padding: "14px",
              borderRadius: "14px",
              color: "#4ade80",
            }}
          >
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              style={{ fontSize: "1.3rem" }}
            />
          </div>
          <div>
            <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: 0 }}>
              Budget
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#fff",
                margin: "2px 0 0",
              }}
            >
              {formatCurrency(movie.budget)}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              backgroundColor: "rgba(96, 165, 250, 0.12)",
              padding: "14px",
              borderRadius: "14px",
              color: "#60a5fa",
            }}
          >
            <FontAwesomeIcon
              icon={faChartLine}
              style={{ fontSize: "1.3rem" }}
            />
          </div>
          <div>
            <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: 0 }}>
              Revenue
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#fff",
                margin: "2px 0 0",
              }}
            >
              {formatCurrency(movie.revenue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
