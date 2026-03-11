import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import "./index.css";
import Navbar from "../Navbar";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const BASE = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : 'https://emotfix-2.onrender.com';

  // Check authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setIsAuthenticated(true);
      setUsername(storedUser);
    }
  }, []);

  // Load movie data
  useEffect(() => {
    async function loadMovie() {
      try {
        const res = await fetch(`${BASE}/api/movies/${id}`);
        if (!res.ok) throw new Error("Failed to fetch movie");
        const data = await res.json();
        console.log("📺 Movie loaded:", data);
        console.log("🎬 Trailer URL:", data.trailerUrl);
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

  // Check if movie is in watchlist
  useEffect(() => {
    if (username && movie) {
      const watchlist = JSON.parse(localStorage.getItem(`watchlist_${username}`) || '[]');
      setIsInWatchlist(watchlist.some(m => m._id === movie._id));
    }
  }, [username, movie]);

  // Add new review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please sign in to add a review");
      return;
    }
    if (!newReview.trim()) return;

    const reviewData = {
      movieId: id,
      reviewText: newReview,
      author: username,
    };

    try {
      const res = await fetch(`${BASE}/api/reviews/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      if (!res.ok) throw new Error("Failed to add review");
      const savedReview = await res.json();
      setReviews([...reviews, savedReview]);
      setNewReview("");
    } catch (err) {
      console.error("❌ Error adding review:", err);
    }
  };

  // Toggle watchlist
  const toggleWatchlist = () => {
    if (!isAuthenticated) {
      alert("Please sign in to add to watchlist");
      return;
    }

    const watchlist = JSON.parse(localStorage.getItem(`watchlist_${username}`) || '[]');

    if (isInWatchlist) {
      const updated = watchlist.filter(m => m._id !== movie._id);
      localStorage.setItem(`watchlist_${username}`, JSON.stringify(updated));
      setIsInWatchlist(false);
    } else {
      watchlist.push(movie);
      localStorage.setItem(`watchlist_${username}`, JSON.stringify(watchlist));
      setIsInWatchlist(true);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('/embed/')) return url;
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  if (!movie) return (
    <div className="loading-container">
      <Navbar />
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    </div>
  );

  return (
    <div className="movie-details-page">
      <Navbar />

      {/* Hero Section with Movie Poster */}
      <div className="movie-hero" style={{
        backgroundImage: `url(${movie.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="movie-poster-container">
            <img
              src={movie.poster || "https://via.placeholder.com/400x600?text=No+Image"}
              alt={movie.title}
              className="movie-poster-large"
            />
          </div>

          <div className="movie-info">
            <h1 className="movie-title-large">{movie.title}</h1>

            <div className="movie-meta">
              {movie.genres && (
                <span className="genre-tags">
                  {movie.genres.map((genre, i) => (
                    <span key={i} className="genre-tag">{genre}</span>
                  ))}
                </span>
              )}
              <span className="movie-rating">⭐ {movie.rating || '4.5'}/5</span>
            </div>

            <p className="movie-description">{movie.overview}</p>

            <div className="action-buttons">
              <button
                className="btn-watch-trailer"
                onClick={() => setShowTrailer(true)}
              >
                <span className="btn-icon">▶️</span>
                Watch Trailer
              </button>

              <button
                className="btn-watchlist"
                onClick={toggleWatchlist}
              >
                <span className="btn-icon">{isInWatchlist ? '✓' : '+'}</span>
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>

              <button
                className="btn-back"
                onClick={() => navigate(-1)}
              >
                <span className="btn-icon">←</span>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTrailer(false)}>
              ✕
            </button>
            <div className="player-wrapper">
              {movie.trailerUrl ? (
                <div className="trailer-content">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(movie.trailerUrl)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Movie Trailer"
                  />
                  <p className="trailer-url-display">
                    <strong>Trailer Link:</strong> <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">{movie.trailerUrl}</a>
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  <p>Trailer not available for this movie</p>
                </div>
              )}
            </div>
            <button 
              className="btn-back-to-movies" 
              onClick={() => setShowTrailer(false)}
            >
              <span className="btn-icon">←</span>
              Back to Movie Details
            </button>
          </div>
        </div>
      )}

      {/* Reviews Section - Only for authenticated users */}
      {isAuthenticated && (
        <div className="reviews-section-details">
          <div className="reviews-container">
            <h2 className="reviews-heading">
              <span className="section-icon">💬</span>
              User Reviews
            </h2>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="add-review-form">
              <textarea
                className="review-input"
                placeholder="Share your thoughts about this movie..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows="4"
              ></textarea>
              <button type="submit" className="review-submit-btn">
                Post Review
              </button>
            </form>

            {/* Reviews List */}
            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-author-avatar">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="review-content">
                      <div className="review-author-name">{review.author}</div>
                      <p className="review-text">"{review.reviewText}"</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-reviews">No reviews yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

