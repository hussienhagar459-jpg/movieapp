import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

export default function MovieCast({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
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
        <FontAwesomeIcon icon={faUsers} style={{ color: "#facc15" }} />
        <span>Top Cast</span>
      </h2>

      <div
        style={{
          display: "flex",
          gap: "18px",
          overflowX: "auto",
          paddingBottom: "14px",
        }}
      >
        {cast.slice(0, 12).map((actor) => (
          <div
            key={actor.id}
            style={{
              flex: "0 0 150px",
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "16px",
              padding: "18px 12px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${actor.profile_path}`
                  : "https://via.placeholder.com/200x200?text=No+Photo"
              }
              alt={actor.name}
              style={{
                width: "85px",
                height: "85px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "12px",
                border: "2px solid #facc15",
              }}
            />
            <h4
              style={{
                fontWeight: "bold",
                fontSize: "0.9rem",
                color: "#fff",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                margin: "0 0 4px",
              }}
            >
              {actor.name}
            </h4>
            <p
              style={{
                fontSize: "0.78rem",
                color: "#9ca3af",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                margin: 0,
              }}
            >
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
