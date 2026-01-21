import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function MovieCarousel({ title, movies, category }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-carousel">
      <h2 className="carousel-title">{title}</h2>
      
      <div className="carousel-wrapper">
        <button 
          className="carousel-btn carousel-btn-left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
        
        <div className="carousel-container" ref={scrollRef}>
          {movies.map((movie) => (
            <div 
              key={movie._id} 
              className="carousel-card"
              onClick={() => handleMovieClick(movie._id)}
            >
              <div className="carousel-card-image">
                <img 
                  src={movie.poster || "https://via.placeholder.com/300x450?text=No+Image"} 
                  alt={movie.title}
                  loading="lazy"
                />
                <div className="carousel-card-overlay">
                  <div className="carousel-card-info">
                    <h3>{movie.title}</h3>
                    <p className="carousel-genres">
                      {movie.genres?.slice(0, 2).join(' • ')}
                    </p>
                    <div className="carousel-rating">
                      ⭐ {movie.rating || '4.5'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-btn carousel-btn-right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default MovieCarousel;
