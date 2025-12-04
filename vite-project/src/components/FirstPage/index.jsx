import React from 'react'
import {useState} from "react"
import { useEffect } from 'react';
import "./index.css"
import HappyMood from '../HappyMood'
import SadMood from '../SadMood'
import AngryMood from '../AngryMood'
import ThrilledMood from '../ThrilledMood'
// import MovieList from '../MovieList'

import { useNavigate } from "react-router-dom"

function FirstPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

    useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);
  // const [selectedMood, setSelectedMood] = useState(null);
  return (

    <div className='firstpage'>
      <div className='overlay'></div>

      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

       {username && <h2 className="welcome-text">Welcome back, {username}! 🎬 </h2>}
        <h1 className='header'>Find Movies Based On Your Current Mood</h1>
        <div className='mood-container'>
          
        <div onClick={() => navigate("/movies/happy")}>
          <HappyMood />
        </div>
        <div onClick={() => navigate("/movies/sad")}>
          <SadMood />
        </div>
        <div onClick={() => navigate("/movies/angry")}>
          <AngryMood />
        </div>
        <div onClick={() => navigate("/movies/thrilled")}>
          <ThrilledMood />
        </div>



        </div>
        
        {/* {selectedMood && <MovieList mood={selectedMood} />}
    </div> */}
     </div>

  )
}

export default FirstPage


