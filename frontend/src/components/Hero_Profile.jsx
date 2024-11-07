// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hero_Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      axios
        .get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          setError('Failed to load user data');
        });
    } else {
      setError('User is not logged in');
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Is Handyman:</strong> {user.is_handyman ? 'Yes' : 'No'}</p>
      <p><strong>Preferences:</strong> {user.preferences || 'N/A'}</p>
      <p><strong>Reviews:</strong> {user.reviews || 'No reviews yet'}</p>
    </div>
  );
};

export default Hero_Profile;
