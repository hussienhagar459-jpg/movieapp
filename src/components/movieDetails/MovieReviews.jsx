import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faStar } from "@fortawesome/free-solid-svg-icons";

export default function MovieReviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
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
          <FontAwesomeIcon icon={faComments} style={{ color: "#facc15" }} />
          <span>User Reviews</span>
        </h2>
        <p
          style={{
            color: "#9ca3af",
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          No reviews available for this movie yet.
        </p>
      </div>
    );
  }

  return (
    // Reviews Section Container
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
        <FontAwesomeIcon icon={faComments} style={{ color: "#facc15" }} />
        <span>User Reviews ({reviews.length})</span>
      </h2>

      {/* Reviews Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {reviews.slice(0, 5).map((rev) => (
          <div
            key={rev.id}
            style={{
              width: "100%",
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "18px",
              padding: "24px",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* Author Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4
                style={{
                  fontWeight: "bold",
                  color: "#facc15",
                  margin: 0,
                  fontSize: "1.1rem",
                }}
              >
                {rev.author}
              </h4>
              {rev.author_details?.rating && (
                <span
                  style={{
                    backgroundColor: "rgba(250, 204, 21, 0.12)",
                    color: "#facc15",
                    border: "1px solid rgba(250, 204, 21, 0.35)",
                    fontSize: "0.8rem",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <FontAwesomeIcon icon={faStar} />
                  <span>{rev.author_details.rating}/10</span>
                </span>
              )}
            </div>

            {/* Scrollable Content Container (Max 3-4 lines with Y-Scroll) */}
            <div
              style={{
                maxHeight: "95px",
                overflowY: "auto",
                paddingRight: "8px",
              }}
            >
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {rev.content}
              </p>
            </div>

            {/* Creation Date */}
            <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>
              {new Date(rev.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
