import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import "./App.css"
import Signin from './components/Signin'
import SignUp from './components/signup'
import Home from './components/Home'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import ChatBot from './components/chatbot'

// Helper component to handle scrolling to hashes after route changes
const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return null;
};

function App() {
  return (
    <div>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movies/:mood" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default App