import React, { useState } from 'react';
import axios from 'axios';
import './Job_Post_Form.css';

const Job_Post_Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');

    const getCsrfToken = () => {
        const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue || '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const csrfToken = getCsrfToken();
            const response = await axios.post(
                'http://127.0.0.1:8000/api/jobs/',
                { title, description, location, price },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                    withCredentials: true,  // Include cookies in request
                }
            );
            
            // Confirm the response and reset fields
            console.log('Job posted:', response.data);
            
            if (response.status === 201) {  // 201 Created
                setTitle('');
                setDescription('');
                setLocation('');
                setPrice('');
            } else {
                console.error('Job not created:', response.status, response.data);
            }
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };
    

    return (
        <div className="job-post-form-container">
            <h2>Post a Job Request</h2>
            <form onSubmit={handleSubmit} className="job-post-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Job Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Job Description"
                    required
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default Job_Post_Form;
