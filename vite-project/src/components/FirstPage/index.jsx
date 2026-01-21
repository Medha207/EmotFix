import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./index.css"
import HappyMood from '../HappyMood'
import SadMood from '../SadMood'
import AngryMood from '../AngryMood'
import ThrilledMood from '../ThrilledMood'
import MovieCarousel from '../MovieCarousel'

function FirstPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) setUsername(storedUser);
    }, []);

    // Fetch featured and trending movies
    useEffect(() => {
        async function fetchMovies() {
            try {
                // Fetch happy movies for featured
                const featuredRes = await fetch(`${BASE}/api/movies?mood=happy`);
                if (featuredRes.ok) {
                    const data = await featuredRes.json();
                    setFeaturedMovies(data.slice(0, 10));
                }

                // Fetch thrilled movies for trending
                const trendingRes = await fetch(`${BASE}/api/movies?mood=thrilled`);
                if (trendingRes.ok) {
                    const data = await trendingRes.json();
                    setTrendingMovies(data.slice(0, 10));
                }
            } catch (err) {
                console.error('Error fetching movies:', err);
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
            <div className='mood-container'>
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
                <MovieCarousel
                    title="🎉 Feel-Good Favorites"
                    movies={featuredMovies}
                    category="happy"
                />
                <MovieCarousel
                    title="🔥 Trending Now"
                    movies={trendingMovies}
                    category="thrilled"
                />
            </div>
        </div>
    )
}

export default FirstPage
