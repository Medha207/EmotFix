import React from 'react'
import "./index.css"
import { useState } from "react";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/users`;

function SignUp() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const user = (event)=>{
    setUsername(event.target.value);
  }

  const emailId = (event)=>{
    setEmail(event.target.value);
  }

  const pass = (event)=>{
    setPassword(event.target.value);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/register`, {
        username,
        email,
        password,
      });
      setMessage("✅ Registered successfully! Please login.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
  console.error("🔴 Registration error:", err.response?.data);
  setMessage(`❌ ${err.response?.data?.error || err.message || "Registration failed. Try again."}`);
    }

  };

  return (
  <div className='signupContainer'>
    <div className='box'>
        <h1 className='heading'>SignUp</h1>
        <p className="p">Username</p>
        <input type = "text" value={username} onChange={user} placeholder='username'></input>
        <p className='p'>Email</p>
        <input type = "email"  value={email}
            onChange={emailId} placeholder='email'></input>
        <p className='p'>Password</p>
        <input type = "password" value={password}
            onChange={pass} placeholder='password'></input>
        <button className='btn' onClick={handleRegister}>SignUp</button>
        {message && <p className='message'>{message}</p>}
        <p className='p'>Already have an account? <a href="/signin"><span>SignIn</span></a></p>
        
    </div>
     </div>

  )
}

export default SignUp