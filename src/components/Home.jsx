import React from 'react'
import FirstPage from './FirstPage'
import Navbar from './Navbar'
import FAQ from './FAQ'
import Footer from './Footer'
import ChatBot from './chatbot'
import ReviewsSection from './ReviewSection'
function Home() {
  return (
    <div>
       
    <Navbar/>
    <FirstPage/>
    <FAQ/>
    <ReviewsSection/>
    <Footer/>
    <ChatBot/>
    </div>

  )
}

export default Home