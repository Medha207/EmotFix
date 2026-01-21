import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';
import Navbar from '../Navbar';

function Dashboard() {
    const [username, setUsername] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [watchlist, setWatchlist] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (!storedUser) {
            navigate("/signin");
        } else {
            setUsername(storedUser);
            setIsAuthenticated(true);
            loadUserData(storedUser);
        }
    }, [navigate]);

    const loadUserData = (user) => {
        // Load watchlist from localStorage
        const savedWatchlist = localStorage.getItem(`watchlist_${user}`);
        if (savedWatchlist) {
            setWatchlist(JSON.parse(savedWatchlist));
        }

        // Load user reviews from localStorage
        const savedReviews = localStorage.getItem(`reviews_${user}`);
        if (savedReviews) {
            setUserReviews(JSON.parse(savedReviews));
        }
    };

    const removeFromWatchlist = (movieId) => {
        const updatedWatchlist = watchlist.filter(movie => movie._id !== movieId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem(`watchlist_${username}`, JSON.stringify(updatedWatchlist));
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="dashboard-page">
            <Navbar />

            <div className="dashboard-container">
                {/* Hero Section */}
                <div className="dashboard-hero">
                    <div className="hero-content">
                        <h1 className="dashboard-title">
                            Welcome, <span className="username-gradient">{username}</span>! 🎬
                        </h1>
                        <p className="dashboard-subtitle">
                            Your personalized movie experience awaits
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📺</div>
                            <div className="stat-info">
                                <h3>{watchlist.length}</h3>
                                <p>Movies in Watchlist</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-info">
                                <h3>{userReviews.length}</h3>
                                <p>Reviews Written</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🎯</div>
                            <div className="stat-info">
                                <h3>4</h3>
                                <p>Mood Categories</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Watchlist Section */}
                <section className="dashboard-section">
                    <h2 className="section-title">
                        <span className="section-icon">📋</span>
                        My Watchlist
                    </h2>

                    {watchlist.length > 0 ? (
                        <div className="watchlist-grid">
                            {watchlist.map((movie) => (
                                <div key={movie._id} className="watchlist-card">
                                    <div className="watchlist-card-image">
                                        <img
                                            src={movie.poster || "https://via.placeholder.com/300x450?text=No+Image"}
                                            alt={movie.title}
                                        />
                                        <div className="watchlist-overlay">
                                            <Link to={`/movie/${movie._id}`} className="view-btn">
                                                View Details
                                            </Link>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromWatchlist(movie._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="watchlist-info">
                                        <h3>{movie.title}</h3>
                                        <p className="movie-genres">{movie.genres?.slice(0, 2).join(' • ')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">🎬</div>
                            <h3>Your watchlist is empty</h3>
                            <p>Start adding movies to watch later!</p>
                            <Link to="/" className="browse-btn">
                                Browse Movies
                            </Link>
                        </div>
                    )}
                </section>

                {/* Reviews Section */}
                <section className="dashboard-section">
                    <h2 className="section-title">
                        <span className="section-icon">💬</span>
                        My Reviews
                    </h2>

                    {userReviews.length > 0 ? (
                        <div className="reviews-grid">
                            {userReviews.map((review, index) => (
                                <div key={index} className="review-card-dashboard">
                                    <div className="review-header">
                                        <h3>{review.movieTitle}</h3>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                    <p className="review-text">"{review.text}"</p>
                                    <div className="review-rating">
                                        ⭐ {review.rating || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">⭐</div>
                            <h3>No reviews yet</h3>
                            <p>Share your thoughts on movies you've watched!</p>
                        </div>
                    )}
                </section>

                {/* Quick Actions */}
                <section className="dashboard-section">
                    <h2 className="section-title">
                        <span className="section-icon">🚀</span>
                        Quick Actions
                    </h2>

                    <div className="quick-actions-grid">
                        <Link to="/movies/happy" className="action-card">
                            <span className="action-icon">😊</span>
                            <h3>Happy Movies</h3>
                            <p>Feel-good favorites</p>
                        </Link>
                        <Link to="/movies/sad" className="action-card">
                            <span className="action-icon">😢</span>
                            <h3>Sad Movies</h3>
                            <p>Emotional dramas</p>
                        </Link>
                        <Link to="/movies/angry" className="action-card">
                            <span className="action-icon">😠</span>
                            <h3>Angry Movies</h3>
                            <p>Action-packed thrillers</p>
                        </Link>
                        <Link to="/movies/thrilled" className="action-card">
                            <span className="action-icon">😱</span>
                            <h3>Thrilled Movies</h3>
                            <p>Edge-of-your-seat excitement</p>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
