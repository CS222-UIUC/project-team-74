import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Job_Post_Form.css';  // Reusing the same CSS for styling consistency
import { FaStar ,FaCommentAlt,FaRegIdCard  } from "react-icons/fa";

function ReviewFromPop({ reviewedUser }) {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    //const [reviewedUser, setReviewedUser] = useState(''); // ID of the user being reviewed
    const [writtenBy, setWrittenBy] = useState(''); // ID of the logged-in user

    useEffect(() => {
        // Fetch user information to set 'written_by'
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/profile/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                setWrittenBy(response.data.id); // Set the user ID from the profile API response
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert("You need to be logged in to submit a review.");
            return;
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/reviews/',
                {
                    rating: parseInt(rating),
                    comment,
                    reviewed_user: reviewedUser,
                    written_by: writtenBy // Add the logged-in user's ID here
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                alert('Review submitted successfully!');
                setRating('');
                setComment('');
                setReviewedUser('');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review.');
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show2');
            } else {
              entry.target.classList.remove('show2');
            }
          });
        });
    
        const hiddenElements = document.querySelectorAll('.hidden2'); 
        hiddenElements.forEach((el) => observer.observe(el));
    
      
        return () => observer.disconnect();
      }, []);
    

    return (
        <div className="bg-gray-100 p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#525252] font-fraunces mb-6">Submit a Review</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Field */}
          <div>
            <label className="block text-lg font-bold text-gray-600 font-roboto mb-2">Rating</label>
            <div className="relative">
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating (0-10)"
                min="0"
                max="10"
                required
                className="w-full px-4 py-2 bg-gray-100 text-blue-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaStar className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
      
          {/* Comment Field */}
          <div>
            <label className="block text-lg font-bold text-gray-600 font-roboto mb-2">Comment</label>
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your Comment"
                className="w-full px-4 py-2 bg-gray-100 text-blue-800 h-32 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                required
              />
              <FaCommentAlt className="absolute bottom-4 right-4 text-gray-400" />
            </div>
          </div>
      
          {/* User ID Field */}
          <div>
            <label className="block text-lg font-bold text-gray-600 font-roboto mb-2">User ID</label>
            <div className="relative">
              <input
                type="text"
                value={reviewedUser}
                onChange={(e) => setReviewedUser(e.target.value)}
                placeholder="Reviewed User ID"
                className="w-full px-4 py-2 border bg-gray-100 text-gray-400 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <FaRegIdCard className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
      
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-800 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Review
          </button>
        </form>
      </div>
    );
}

export default ReviewFromPop;
