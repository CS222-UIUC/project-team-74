import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoStarSharp } from "react-icons/io5";

function Browse() {
    const [selectedHandyman, setSelectedHandyman] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handymen = [
        {
            imgSrc: "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar11.jpg",
            name: "Samantha Reynolds",
            position: "Plumber",
            details: "Expert in plumbing services with 10+ years of experience. Specializes in residential repairs and installations.",
            rating: 8.5
        },
        {
            imgSrc: "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar2.jpg",
            name: "Benjamin Martinez",
            position: "Painter",
            details: "Skilled painter experienced in interior and exterior home painting. Known for attention to detail.",
        },
        {
            imgSrc: "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar5.jpg",
            name: "Emily Turner",
            position: "Electrician",
            details: "Certified electrician specializing in both residential and commercial electrical work.",
            rating: 9.5
        },
        {
            imgSrc: "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar24.jpg",
            name: "Jason Anderson",
            position: "Plumber",
            details: "Experienced plumber with expertise in advanced piping systems and emergency repairs.",
            rating: 8.0
        },
        {
            imgSrc: "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar23.jpg",
            name: "Olivia Carter",
            position: "Electrician",
            details: "Expert in electrical troubleshooting and installations. Focuses on energy-efficient solutions.",
            rating: 8.5
        },
    ];

    // Filter handymen based on the search term
    const filteredHandymen = handymen.filter(handyman => 
        handyman.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        handyman.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-wrap bg-white">
                <div className="w-full max-w-full px-3 mb-6 mx-auto">
                    <div className="flex-auto block py-8 px-9">
                        <div>
                            <div className="mb-9 text-center">
                                <h1 className="mb-2 text-[4.25rem] font-bold text-[#525252] font-fraunces">Handymen</h1>
                                <span className="text-[1.15rem] font-medium text-muted text-[#3f3f46] font-jost">
                                    Browse through a list of skilled handymen ready to assist with your maintenance needs and find the perfect match for you!
                                </span>
                            </div>

                            {/* Search Bar */}
                            <div className="mb-6 text-center">
                                <input
                                    type="text"
                                    placeholder="Search by name or position"
                                    className="w-64 px-6 py-2 border rounded-lg shadow-sm bg-white text-[#525252] font-fraunces"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap w-full justify-center items-center">
                                {filteredHandymen.map((handyman, index) => (
                                    <Handyman
                                        key={index}
                                        {...handyman}
                                        onClick={() => setSelectedHandyman(handyman)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {selectedHandyman && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-12 rounded-lg shadow-lg max-w-md w-full relative">
                        <button
                            className="absolute top-2 right-4 text-xl text-gray-400 hover:text-gray-600"
                            onClick={() => setSelectedHandyman(null)}
                        >
                            &times;
                        </button>
                        <img
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                            src={selectedHandyman.imgSrc}
                            alt={selectedHandyman.name}
                        />
                        <h2 className="text-xl font-bold text-center text-[#a67905] mb-2">
                            {selectedHandyman.name}
                            {selectedHandyman.rating != null ? (
                                <>
                                    <span>{` (${selectedHandyman.rating}/10)`}</span>
                                    <IoStarSharp className="inline-block text-yellow-500 text-2xl ml-1 pb-1" /> {/* Star Icon */}
                                </>
                            ) : ""}
                        </h2>
                        <p className="text-center font-semibold text-muted text-[#525252]">{selectedHandyman.position}</p>
                        <p className="text-center px-8 text-sm text-gray-700 mt-4">{selectedHandyman.details}</p>
                        <a href="javascript:void(0)">
                            <button className="bg-yellow-600 rounded-md px-5 py-2 text-white mt-6 hover:bg-yellow-700 transition-colors duration-100 ease-in-out mx-auto block">
                            Contact Now
                            </button>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

function Handyman({ imgSrc, name, position, onClick }) {
    return (
        <a
            href="javascript:void(0)"
            onClick={onClick}
            className="flex flex-col mr-5 text-center text-[#525252] mb-11 lg:mr-16 transform hover:scale-105 transition-transform duration-200 ease-in-out"
        >
            <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                <img
                    className="inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]"
                    src={imgSrc}
                    alt={`${name} avatar`}
                />
            </div>
            <div className="text-center">
                <div className="text-[#a67905] font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">
                    {name}
                </div>
                <span className="block font-medium text-muted">{position}</span>
            </div>
        </a>
    );
}

Handyman.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Browse;
