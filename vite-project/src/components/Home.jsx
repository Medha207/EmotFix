import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FirstPage from './FirstPage'
import Navbar from './Navbar'
import FAQ from './FAQ'
import Footer from './Footer'
import ChatBot from './chatbot'

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsAuthenticated(!!username);
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <FirstPage />
      <FAQ />
      <Footer />
      <ChatBot />
    </div>
  )
}

export default Home
