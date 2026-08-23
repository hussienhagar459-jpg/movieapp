import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

export default function MovieTrailer({ videos }) {
  const trailer =
    videos?.results?.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube",
    ) || videos?.results?.[0];

  if (!trailer) return null;

  return (
    <div
      id="trailer-section"
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
        <FontAwesomeIcon icon={faFilm} style={{ color: "#facc15" }} />
        <span>Official Trailer</span>
      </h2>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "960px",
          margin: "0 auto",
          borderRadius: "20px",
          overflow: "hidden",
          aspectRatio: "16/9",
          backgroundColor: "#000",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 25px 40px rgba(0,0,0,0.6)",
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
