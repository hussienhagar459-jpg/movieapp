export default function TvCast({ cast }) {
  if (!cast || cast.length === 0) {
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
        Cast
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "25px",
        }}
      >
        {cast.slice(0, 10).map((person) => (
          <div
            key={person.id}
            style={{
              textAlign: "center",
            }}
          >
            {person.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "220px",
                  borderRadius: "12px",
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

            <h3
              style={{
                marginTop: "12px",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              {person.name}
            </h3>

            <p
              style={{
                marginTop: "5px",
                color: "#9ca3af",
                fontSize: "0.9rem",
              }}
            >
              {person.character}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}