export default function Recommendations({ movies }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "25px",
        }}
      >
        You May Also Like
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "25px",
        }}
      >
        {movies.slice(0, 6).map((movie) => (
          <div
            key={movie.id}
            style={{
              backgroundColor: "#111827",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.name || movie.title}
                style={{
                  width: "100%",
                  height: "270px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  height: "270px",
                  backgroundColor: "#1f2937",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#9ca3af",
                }}
              >
                No Image
              </div>
            )}

            <div
              style={{
                padding: "15px",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                {movie.name || movie.title}
              </h3>

              {movie.first_air_date && (
                <p
                  style={{
                    color: "#9ca3af",
                    marginTop: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  {movie.first_air_date}
                </p>
              )}

              {movie.vote_average > 0 && (
                <p
                  style={{
                    color: "#facc15",
                    marginTop: "5px",
                    fontSize: "0.9rem",
                  }}
                >
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}