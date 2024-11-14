import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Job_Post_Form.css';  // Reusing the same CSS for styling consistency

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
            <h2>Submit a Review</h2>
            <form onSubmit={handleSubmit} className="job-post-form"> {/* Reuse form class */}
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating (0-10)"
                    className="job-post-input"  // Added CSS class for consistent input styling
                    min="0"
                    max="10"
                    required
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Your Comment"
                    className="job-post-textarea" // Added CSS class for consistent textarea styling
                    required
                />
                <input
                    type="text"
                    value={reviewedUser}
                    onChange={(e) => setReviewedUser(e.target.value)}
                    placeholder="Reviewed User ID"
                    className="job-post-input" // Added CSS class for consistent input styling
                    required
                />
                <button type="submit" className="job-post-button">Submit Review</button> {/* Reuse button styling */}
            </form>
        </div>
    );
}

export default ReviewForm;
