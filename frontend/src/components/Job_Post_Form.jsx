import React, { useState } from 'react';
import axios from 'axios';
import './Job_Post_Form.css';
import { MdOutlineTitle, MdSubtitles } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import MapPost from '../maps/MapPost';
import { useEffect } from 'react';

const Job_Post_Form = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Posting job:', title, description, price, coordinates, location);
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/jobs/',
                { title, description, price, coordinates, location },
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            console.log('Job posted:', response.data);
            
            if (response.status === 201) {
                setTitle('');
                setDescription('');
                setPrice('');
                setCoordinates(null);
                setLocation('');
            } else {
                console.error('Job not created:', response.status, response.data);
            }
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    const handleLocationSelect = (coords, address) => {
        setCoordinates(coords);
        setLocation(address);
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
        <div className="job-post-form-container hidden2">
            <h1 className="font-roboto font-bold text-3xl text-green-700 pb-5">Post a Job Request</h1>
            <form onSubmit={handleSubmit} className="job-post-form flex flex-col h-full ">
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
