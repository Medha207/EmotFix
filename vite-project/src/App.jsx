import React from 'react'
import { Routes, Route } from "react-router-dom"
import "./App.css"
import Signin from './components/Signin'
import SignUp from './components/signup'
import Home from './components/Home'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movies/:mood" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App