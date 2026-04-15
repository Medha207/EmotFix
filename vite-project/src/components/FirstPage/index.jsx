import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { BASE_URL } from '../../config/api'
import "./index.css"
import HappyMood from '../HappyMood'
import SadMood from '../SadMood'
import AngryMood from '../AngryMood'
import ThrilledMood from '../ThrilledMood'
import MovieCarousel from '../MovieCarousel'
import FAQ from '../FAQ'
import Footer from '../Footer'
import ChatBot from '../chatbot'

function FirstPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE = BASE_URL;

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) setUsername(storedUser);
    }, []);

    // Fetch featured and trending movies
    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            setError(null);
            try {
                // Fetch happy movies for featured
                const featuredRes = await fetch(`${BASE}/api/movies?mood=happy`);
                let featuredData = [];
                if (featuredRes.ok) {
                    featuredData = await featuredRes.json();
                }

                // Fetch thrilled movies for trending
                const trendingRes = await fetch(`${BASE}/api/movies?mood=thrilled`);
                let trendingData = [];
                if (trendingRes.ok) {
                    trendingData = await trendingRes.json();
                }

                setFeaturedMovies(featuredData.slice(0, 10));
                setTrendingMovies(trendingData.slice(0, 10));
                
                if (featuredData.length === 0 && trendingData.length === 0) {
                    console.warn("No movies fetched from backend");
                }
            } catch (err) {
                console.error('Error fetching movies from:', BASE, err);
                setError(`Failed to load movies from server. Please check your connection.`);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [BASE]);

    return (
        <div className='firstpage'>
            {/* Animated Background */}
            <div className='animated-bg'>
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>

            {/* Hero Section */}
            <div className="hero-section">
                {username && (
                    <h2 className="welcome-text animate-fadeIn">
                        Welcome back, <span className="username-highlight">{username}</span>! 🎬
                    </h2>
                )}
                <h1 className='header animate-slideUp'>
                    Discover Movies That Match Your Mood
                </h1>
                <p className="tagline animate-fadeIn">
                    Your emotions, your entertainment. Find the perfect movie for every feeling.
                </p>
            </div>

            {/* Mood Selection */}
            <div className='mood-container' id="moods">
                <div className="mood-card" onClick={() => navigate("/movies/happy")}>
                    <HappyMood />
                </div>
                <div className="mood-card" onClick={() => navigate("/movies/sad")}>
                    <SadMood />
                </div>
                <div className="mood-card" onClick={() => navigate("/movies/angry")}>
                    <AngryMood />
                </div>
                <div className="mood-card" onClick={() => navigate("/movies/thrilled")}>
                    <ThrilledMood />
                </div>
            </div>

            {/* Movie Carousels */}
            <div className="carousels-section">
                {loading && <div className="loading-spinner">Loading movies...</div>}
                {error && <div className="error-message">{error}</div>}
                
                {!loading && featuredMovies.length > 0 && (
                    <MovieCarousel
                        title="🎉 Feel-Good Favorites"
                        movies={featuredMovies}
                        category="happy"
                    />
                )}
                
                {!loading && trendingMovies.length > 0 && (
                    <MovieCarousel
                        title="🔥 Trending Now"
                        movies={trendingMovies}
                        category="thrilled"
                    />
                )}

                {!loading && featuredMovies.length === 0 && trendingMovies.length === 0 && !error && (
                    <div className="no-movies-fallback">
                        <h3>Discovering more movies for you...</h3>
                    </div>
                )}
            </div>

            <FAQ />
        </div>
    )
}

export default FirstPage
