import React, { useEffect } from 'react'
import FirstPage from './FirstPage'
import Navbar from './Navbar'
import FAQ from './FAQ'
import Footer from './Footer'
import ChatBot from './chatbot'

function Home() {
  useEffect(() => {
    localStorage.getItem("username");
  }, []);

  return (
    <div>
      <Navbar />
      <FirstPage />
    </div>
  )
}

export default Home
