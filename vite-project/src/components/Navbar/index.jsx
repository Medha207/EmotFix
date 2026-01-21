import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./index.css"

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setIsAuthenticated(true);
      setUsername(storedUser);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className='nav-container'>
        <Link to="/" className='logo-link'>
          <h1 className='logo'>
            <span className="logo-icon">🎬</span>
            EMOTFIX
          </h1>
        </Link>

        <div className='nav-items'>
          <Link to="/" className='nav-link'>
            <span className="nav-icon">🏠</span>
            Home
          </Link>

          {isAuthenticated && (
            <Link to="/dashboard" className='nav-link'>
              <span className="nav-icon">📊</span>
              Dashboard
            </Link>
          )}

          {isAuthenticated ? (
            <div className="user-profile">
              <button
                className="profile-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="profile-avatar">
                  {username.charAt(0).toUpperCase()}
                </span>
                <span className="profile-name">{username}</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <span>📊</span> My Dashboard
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/signin" className='nav-link signin-link'>
                Sign In
              </Link>
              <Link to="/signup" className='btn-signup'>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

