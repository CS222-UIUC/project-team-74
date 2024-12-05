import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    location: "",
    is_handyman: -1, // -1 indicates role not selected
    details: "",
    specialty: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser(response.data);
        setIsLoggedIn(true);
        setLoading(false);
      } catch (error) {
        setIsLoggedIn(false);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="nav-container">
      <Link to="/home" className="element" id="name">
        HandyHelper&nbsp;<i className="fas fa-wrench"></i>
      </Link>
      <Link to="/about-us" className="element">
        ABOUT US
      </Link>

      {user.is_handyman !== 1 && (
        <>
          {isLoggedIn ? (
            <>
              <Link to="/post" className="element">
                POST A REQUEST
              </Link>
              
              <Link to="/review" className="element">
                WRITE A REVIEW
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="element">
                POST A REQUEST
              </Link>
              
              <Link to="/login" className="element">
                WRITE A REVIEW
              </Link>
            </>
          )}
          <Link to="/browse" className="element">
            BROWSE HANDYMEN
          </Link>
        </>
      )}

      {user.is_handyman === 1 && (
        <Link to="/posted-jobs" className="element">
          JOBS POSTING
        </Link>
      )}

      {isLoggedIn ? (
        <>
          <Link to="/profile" className="element">
            PROFILE
          </Link>
          <button onClick={handleLogout} className="element">
            LOG OUT
          </button>
        </>
      ) : (
        <Link to="/login" className="element">
          LOG IN
        </Link>
      )}
    </div>
  );
}

export default Navbar;
