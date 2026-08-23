export default function TvTrailer({ videos }) {
  const trailer = videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (!trailer) {
    return null;
  }

  return (
    <section id="trailer-section">
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "25px",
        }}
      >
        Trailer
      </h2>

      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          aspectRatio: "16 / 9",
          margin: "0 auto",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}