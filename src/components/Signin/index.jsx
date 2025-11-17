import React from 'react'
import "./index.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const getEmail = (event)=>{
    setEmail(event.target.value);
  }

  const getPassword = (event)=>{
    setPassword(event.target.value);
  }

  

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/api/users";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password
      });
      //console.log("data",res.data.jwtToken)
      localStorage.setItem("token", res.data.jwtToken);
      setMessage("✅ Login successful!");
      setEmail("")
      setPassword("");

      navigate("/");
     

  } catch (err) {
    console.error(err);
    setMessage(`❌ ${err.response?.data?.error || "❌ Invalid credentials. Try again."}`);
  }
};
  
return (
    <div className='signinContainer'>
    <form onSubmit={handleLogin} className='box'>
        <h1 className='heading'>SignIn</h1>
        <label className="p">Email</label>
        <input type = "email" value={email} onChange={getEmail} placeholder='email'></input>
        <label className='p'>Password</label>
        <input type = "password" value={password} onChange={getPassword} placeholder='password'></input><br/>
        <button className='btn'>SignIn</button>
        {message && <p className='message'>{message}</p>}
        <p className='p'>Don't have an account? <a href="/signup"><span>SignUp</span></a></p>
         
    </form>

    </div>
  )
}

export default Signin