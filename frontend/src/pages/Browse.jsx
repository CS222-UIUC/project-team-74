import React from 'react';
import PropTypes from 'prop-types';

function Browse() {
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
                                <div className="flex flex-wrap w-full justify-center items-center">
                                    <Handyman
                                        imgSrc="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar11.jpg"
                                        name="Samantha Reynolds"
                                        position="Plumber"
                                    />
                                    <Handyman
                                        imgSrc="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar2.jpg"
                                        name="Benjamin Martinez"
                                        position="Painter"
                                    />
                                    <Handyman
                                        imgSrc="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar5.jpg"
                                        name="Emily Turner"
                                        position="Electrician"
                                    />
                                    <Handyman
                                        imgSrc="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar24.jpg"
                                        name="Jason Anderson"
                                        position="Plumber"
                                    />
                                    <Handyman
                                        imgSrc="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar23.jpg"
                                        name="Olivia Carter"
                                        position="Electrician"
                                    />
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Handyman({ imgSrc, name, position }) {
    return (
        <a href="javascript:void(0)" className="flex flex-col mr-5 text-center text-[#525252] mb-11 lg:mr-16 transform hover:scale-105 transition-transform duration-200 ease-in-out">
            <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                <img className="inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]" src={imgSrc} alt={`${name} avatar`} />
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
};

export default Browse;
