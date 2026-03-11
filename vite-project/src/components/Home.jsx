import React, { useState, useEffect } from 'react'
import FirstPage from './FirstPage'
import Navbar from './Navbar'
import FAQ from './FAQ'
import Footer from './Footer'
import ChatBot from './chatbot'

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
      <Footer />
      <ChatBot />
    </div>
  )
}

export default Home
