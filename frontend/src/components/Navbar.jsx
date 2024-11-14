import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }
  }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className='nav-container'>
            <Link to="/home" className="element" id='name'>HandyHelper&nbsp;<i className="fas fa-wrench"></i></Link>
            <Link to="/about-us" className='element'>ABOUT US</Link>
            
            {isLoggedIn ? (
                <>
                     <Link to="/post" className='element'>POST A REQUEST</Link>
                     <Link to="/review" className='element'>WRITE A REVIEW</Link>
                </>
            ) : (
               <>
                <Link to="/login" className='element'>POST A REQUEST</Link>
                <Link to="/login" className='element'>WRITE A REVIEW</Link>
               </>
            )}
            <Link to="/browse" className='element'>BROWSE HANDYMEN</Link>
            <Link to="/posted-jobs" className='element'>JOBS POSTING</Link>
            {isLoggedIn ? (
                <>
                    <Link to="/profile" className='element'>PROFILE</Link>
                    <button onClick={handleLogout} className='element'>LOG OUT</button>
                </>
            ) : (
                <Link to="/login" className='element'>LOG IN</Link>
            )}
        </div>
    );
}

export default Navbar;
