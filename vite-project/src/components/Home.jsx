import React, { useState, useEffect } from 'react'
import FirstPage from './FirstPage'
import Navbar from './Navbar'
import FAQ from './FAQ'
import Footer from './Footer'
import ChatBot from './chatbot'
import ReviewsSection from './ReviewSection'

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsAuthenticated(!!username);
  }, []);

  return (
    <div>
      <Navbar />
      <FirstPage />
      <FAQ />
      {isAuthenticated && <ReviewsSection />}
      <Footer />
      <ChatBot />
    </div>
  )
}

export default Home
