// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import './index.css';

// export default function MovieList() {
//   const { mood } = useParams(); // route /movies/:mood
//   const [movies, setMovies] = useState([]);
//   const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await fetch(`${BASE}/api/movies?mood=${encodeURIComponent(mood)}`);
//         if (!res.ok) throw new Error('Fetch failed');
//         const data = await res.json();
//         setMovies(data || []);
//       } catch (err) {
//         console.error('Fetch movies error:', err);
//       }
//     }
//     load();
//   }, [mood, BASE]);

//   return (
//     <div className="movie-page">
//       <h2 className="main-heading">Movies for {mood}</h2>

//       <div className="movie-grid">
//         {movies.map(m => (
//           <div key={m._id} className="movie-card">
//             <img src={m.poster} alt={m.title} loading="lazy" />
//             <h4>{m.title}</h4>
//             <p>{m.genres?.join(', ')}</p>
//             <Link to={`/movie/${m._id}`} className="details-link">View details</Link>
//           </div>
//         ))}
//       </div>

//       <Link to="/" className="back-btn">⬅ Back</Link>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../Navbar";

function MovieList() {
  const { mood } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  useEffect(() => {
    if (!mood) return;
    fetch(`${BASE}/api/movies?mood=${mood}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [mood, BASE]);

  // Filter movies
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === '' || movie.genres?.includes(selectedGenre))
  );

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (filteredMovies.length === 0 && movies.length === 0) {
    return (
      <div className="movie-list-page">
        <Navbar />
        <div className="no-movies-container">
          <h2 className="no-movies">No movies found for mood: {mood}</h2>
          <button className="back-button" onClick={() => navigate("/")}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-page">
      <Navbar />
      
      <div className="movie-list-container">
        <h1 className="page-title">
          <span className="mood-emoji">
            {mood === 'happy' && '😊'}
            {mood === 'sad' && '😢'}
            {mood === 'angry' && '😠'}
            {mood === 'thrilled' && '😱'}
          </span>
          {mood.charAt(0).toUpperCase() + mood.slice(1)} Movies
        </h1>

        {/* Search and Filter */}
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="genre-select"
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </div>

        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        {/* Movie Grid */}
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div 
              key={movie._id} 
              className="movie-card"
              onClick={() => handleMovieClick(movie._id)}
            >
              <div className="movie-poster-wrapper">
                <img
                  src={movie.poster || "https://via.placeholder.com/500x750?text=No+Image"}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-overlay">
                  <div className="overlay-content">
                    <h3 className="overlay-title">{movie.title}</h3>
                    <p className="overlay-genres">
                      {movie.genres?.slice(0, 2).join(' • ')}
                    </p>
                    <div className="overlay-rating">
                      ⭐ {movie.rating || '4.5'}
                    </div>
                    <button className="view-details-btn">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && movies.length > 0 && (
          <div className="no-results">
            <h3>No movies match your search</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieList;















































































































































// import React, { useEffect, useState } from "react";
// import "./index.css";

// function MovieList({ mood }) {
//   const [movies, setMovies] = useState([]);
//   const apikey = "ffeeed4d6f77f59ea8fe73e613a3f278";
 
//   console.log("TMDB Key:", apikey)
//   const BASE_URL = "https://api.themoviedb.org/3";

//   // Map moods to keywords
//   const moodKeywords = React.useMemo(() => ({
//     happy: "comedy",
//     sad: "drama",
//     angry: "action",
//     surprised: "thriller"
//   }), []);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {

//         // const response = await fetch(
//         //   `${BASE_URL}/search/movie?api_key=${apikey}&query=${moodKeywords[mood]}`
//         // );
//         const response = await fetch(
//         `${BASE_URL}/search/movie?api_key=${apikey}&query=${moodKeywords[mood]}&language=en-US&page=1`
//         );

//         const data = await response.json();
//         setMovies(data.results || []);
//       } catch (err) {
//         console.error("Error fetching movies:", err);
//       }
//     };

//     fetchMovies();
//   }, [mood, apikey, moodKeywords]);

//   return (
//     <div className="movie-list">
//       <h2 className="main-heading">Movies for {mood}</h2>
//       <div className="movie-grid">
//         {movies.map((movie) => (
//           <div key={movie.id} className="movie-card">
//             <img
//               src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//               alt={movie.title}
//             />
//             <p>{movie.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MovieList;









// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, Link } from "react-router-dom";
// import "./index.css";

// function MovieList() {
//   const { mood } = useParams();  //  mood comes from the URL
//   const [movies, setMovies] = useState([]);
//   const apikey = "ffeeed4d6f77f59ea8fe73e613a3f278"; 
//   const BASE_URL = "https://api.themoviedb.org/3";

//   const moodKeywords = useMemo(() => ({
//     happy: "comedy",
//     sad: "drama",
//     angry: "action",
//     surprised: "thriller"
//   }), []);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/search/movie?api_key=${apikey}&query=${moodKeywords[mood]}&language=en-US&page=1`
//         );
//         const data = await response.json();
//         setMovies(data.results || []);
//       } catch (err) {
//         console.error("Error fetching movies:", err);
//       }
//     };

//     fetchMovies();
//   }, [mood, apikey, moodKeywords]);

//   return (
//     <div className="movie-page">
//       <h2 className="main-heading">Movies for {mood}</h2>
      
//       <div className="movie-grid">
//         {movies.map((movie) => (
//           <div key={movie.id} className="movie-card">
//             <img
//               src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//               alt={movie.title}
//             />
//             <p>{movie.title}</p>
//           </div>
//         ))}
//       </div>

      
//       <Link to="/" className="back-btn">⬅ Back</Link>
//     </div>
//   );
// }

// export default MovieList;