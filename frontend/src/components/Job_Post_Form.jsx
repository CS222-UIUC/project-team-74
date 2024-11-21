import React, { useState } from 'react';
import axios from 'axios';
import './Job_Post_Form.css';
import { MdOutlineTitle, MdSubtitles } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import MapPost from '../maps/MapPost';

const Job_Post_Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [coordinates, setCoordinates] = useState(null);

    const getCsrfToken = () => {
        const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue || '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Posting job:', title, description, price, coordinates);
    
        try {
            const csrfToken = getCsrfToken();
            const response = await axios.post(
                'http://127.0.0.1:8000/api/jobs/',
                { title, description, price, coordinates },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                    withCredentials: true,
                }
            );
            
            console.log('Job posted:', response.data);
            
            if (response.status === 201) {
                setTitle('');
                setDescription('');
                setPrice('');
                setCoordinates(null);
            } else {
                console.error('Job not created:', response.status, response.data);
            }
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    const handleLocationSelect = (coords) => {
        setCoordinates(coords);
    };

    return (
        <div className="job-post-form-container">
            <h1 className="font-roboto font-bold text-3xl text-green-700 pb-5">Post a Job Request</h1>
            <form onSubmit={handleSubmit} className="job-post-form flex flex-col h-full">
                <h1 className="font-roboto font-bold text-xl text-green-700">Job Title</h1>
                <div className="relative w-90">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Job Title"
                        required
                        className="pl-10 py-2 w-[450px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <MdOutlineTitle className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
                </div>
                <h1 className="font-roboto font-bold text-xl text-green-700">Description</h1>
                <div className="relative">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Job Description"
                        required
                        className="pl-10 py-2 w-[450px] h-[100px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <MdSubtitles className="absolute bottom-3 right-3 text-gray-400" />
                </div>
                <div className="relative w-90">
                    <h1 className="font-roboto font-bold text-xl text-green-700">Price</h1>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        required
                        className="pl-10 py-2 w-[450px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <IoIosPricetag className="absolute bottom-3 right-3 text-gray-400" />
                </div>
                <h1 className="font-roboto font-bold text-xl text-green-700">Select Location on Map</h1>
                <div className="flex-1" style={{ height: '400px', width: '100%' }}>
                    <MapPost onLocationSelect={handleLocationSelect} />
                </div>
                <button type="submit" className="pl-10 py-2 w-[450px]">Post Job</button>
            </form>
        </div>
    );
};

export default Job_Post_Form;
