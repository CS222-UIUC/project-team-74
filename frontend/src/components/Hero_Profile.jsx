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
    <div className="max-w-xl h-[80vh] mx-auto p-6 bg-white rounded-lg shadow-md ">
  <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center ">User Profile</h1>
  <p className="text-lg text-gray-700 mb-10"><strong className="font-medium">Username:</strong> {user.username}</p>
  <p className="text-lg text-gray-700 mb-10"><strong className="font-medium">Email:</strong> {user.email}</p>
  <p className="text-lg text-gray-700 mb-10"><strong className="font-medium">Location:</strong> {user.location}</p>
  <p className="text-lg text-gray-700 mb-10"><strong className="font-medium">Is Handyman:</strong> {user.is_handyman ? 'Yes' : 'No'}</p>
  <p className="text-lg text-gray-700 mb-10"><strong className="font-medium">Preferences:</strong> {user.preferences || 'N/A'}</p>
  <p className="text-lg text-gray-700"><strong className="font-medium">Reviews:</strong> {user.reviews || 'No reviews yet'}</p>
</div>
  );
};

export default Hero_Profile;
