import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "./index.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  // Load movie data
  useEffect(() => {
    async function loadMovie() {
      try {
        const res = await fetch(`${BASE}/api/movies/${id}`);
        if (!res.ok) throw new Error("Failed to fetch movie");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("❌ Movie fetch error:", err);
      }
    }
    loadMovie();
  }, [id, BASE]);

  // Load reviews
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch(`${BASE}/api/reviews/${id}`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("❌ Review fetch error:", err);
      }
    }
    loadReviews();
  }, [id, BASE]);

  // Add new review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const reviewData = {
      movieId: id,
      reviewText: newReview,
      author: "Anonymous", // You can later replace this with logged-in user info
    };

    try {
      const res = await fetch(`${BASE}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      const savedReview = await res.json();
      setReviews([...reviews, savedReview]);
      setNewReview("");
    } catch (err) {
      console.error("❌ Error adding review:", err);
    }
  };

  if (!movie) return <div className="loading">Loading movie details...</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-info-card">
        <h1 className="movie-title">{movie.title}</h1>
        <p className="movie-overview">{movie.overview}</p>

        <div className="player-wrapper">
          <ReactPlayer
            url={movie.trailerUrl}
            controls
            width="100%"
            height="100%"
            className="movie-player"
          />
        </div>

        <Link to={`/movies/${movie.mood}`} className="back-btn">
          ⬅ Back to {movie.mood} movies
        </Link>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2 className="review-heading">User Reviews</h2>

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <p className="review-text">"{review.reviewText}"</p>
                <span className="review-author">- {review.author}</span>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews yet. Be the first!</p>
          )}
        </div>

        <form onSubmit={handleAddReview} className="add-review-form">
          <textarea
            className="review-input"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>
          <button type="submit" className="review-submit-btn">
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
}
