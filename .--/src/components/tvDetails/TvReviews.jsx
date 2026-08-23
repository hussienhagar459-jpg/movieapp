export default function TvReviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
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
        Reviews
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {reviews.slice(0, 5).map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: "#111827",
              padding: "25px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                }}
              >
                {review.author}
              </h3>

              {review.author_details?.rating && (
                <span
                  style={{
                    color: "#facc15",
                    fontWeight: "bold",
                  }}
                >
                  ⭐ {review.author_details.rating}/10
                </span>
              )}
            </div>

            <p
              style={{
                color: "#d1d5db",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              {review.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}