import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='nav-container'>
        <Link to="/home" className="element" id='name'>HandyHelper&nbsp;<i className="fas fa-wrench"></i></Link>
        <Link to="/about-us" className='element'>ABOUT US</Link>
        <Link to="/post" className='element'>POST A REQUEST</Link>
        <Link to="/browse" className='element'>BROWSE HANDYMEN</Link>
        <Link to="/posted-jobs" className='element'>JOBS POSTING</Link>
        <Link to="/login" className='element'>LOG IN</Link>
    </div>
  )
}

export default Navbar
