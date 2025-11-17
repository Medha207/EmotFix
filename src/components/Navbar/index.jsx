import React from 'react'
import "./index.css"
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <div className='navbar'>
        <div className='nav'>
            <h1 className='head'>EMOTFLIX</h1>
            <div className='navItems'>
              <p className='para'>My List</p>
              <Link to = "/signin" className='link'>
              <p className='para2'>SignIn/</p>
              </Link>
              <Link to = "/signup" className='link'>
              <p className='para1'>SignUp</p>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
 