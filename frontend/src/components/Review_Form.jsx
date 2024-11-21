import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Job_Post_Form.css';  // Reusing the same CSS for styling consistency
import { FaStar ,FaCommentAlt,FaRegIdCard  } from "react-icons/fa";

function ReviewForm() {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [reviewedUser, setReviewedUser] = useState(''); // ID of the user being reviewed
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

    return (
        <div className="job-post-form-container"> {/* Reuse the container class for styling consistency */}
            <h1 className= "text-[3.5rem] font-fraunces font-bold text-3xl text-[#525252] py-10">Submit a Review</h1>
            <form onSubmit={handleSubmit} className="job-post-form"> {/* Reuse form class */}
                <h1 className= "font-roboto font-bold text-xl text-green-700">Rating</h1>

                <div className="relative w-90" >
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating (0-10)"
                    
                    min="0"
                    max="10"
                    required
                    className ="pl-10 py-2 w-[450px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <FaStar  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />

                </div>



                <h1 className= "font-roboto font-bold text-xl text-green-700">Comment</h1>

                <div className="relative w-90">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Your Comment"
                    className="pl-10 py-2 w-[450px] h-[200px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <FaCommentAlt    className="absolute bottom-3 right-3 text-gray-400" />
                </div>

                <div className="relative w-90">
                <h1 className= "font-roboto font-bold text-xl text-green-700 pb-[10px]">User ID</h1>
                <input
                    type="text"
                    value={reviewedUser}
                    onChange={(e) => setReviewedUser(e.target.value)}
                    placeholder="Reviewed User ID"
                    className ="pl-10 py-2 w-[450px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                />
                <FaRegIdCard   className="absolute top-3/4 right-3 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button type="submit" className="job-post-button">Submit Review</button> {/* Reuse button styling */}
            </form>
        </div>
    );
}

export default ReviewForm;
