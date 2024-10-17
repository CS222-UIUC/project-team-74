import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='nav-container'>
        <Link to="/" className="element" id='name'>HandyHelper&nbsp;<i className="fas fa-wrench"></i></Link>
        <Link to="/about-us" className='element'>ABOUT US</Link>
        <Link to="/" className='element'>POST A REQUEST</Link>
        <Link to="/" className='element'>BROWSE HANDYMEN</Link>
        <Link to="/" className='element'>SIGN IN</Link>
    </div>
  )
}

export default Navbar
