import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { IoStarSharp } from "react-icons/io5";

function Browse() {
  const [selectedHandyman, setSelectedHandyman] = useState(null);
  const [handymen, setHandymen] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/job-postings/handymen/")
      .then((response) => {
        setHandymen(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the job postings!", error);
      });
  }, []);

  // Filter handymen based on the search term
  const filteredHandymen = handymen.filter(
    (handyman) =>
      handyman.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      handyman.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-wrap bg-white">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="flex-auto block py-8 px-9">
            <div>
              <div className="mb-9 text-center">
                <h1 className="mb-2 text-[4.25rem] font-bold text-[#525252] font-fraunces">
                  Handymen
                </h1>
                <span className="text-[1.15rem] font-medium text-muted text-[#3f3f46] font-jost">
                  Browse through a list of skilled handymen ready to assist with
                  your maintenance needs and find the perfect match for you!
                </span>
              </div>

              {/* Search Bar */}
              <div className="mb-6 text-center">
                <input
                  type="text"
                  placeholder="Search by name or specialty"
                  className="w-64 px-6 py-2 border rounded-lg shadow-sm bg-white text-[#525252] font-fraunces"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap w-full justify-center items-center px-12">
                {filteredHandymen.map((handyman) => (
                  <Handyman
                    key={handyman.id}
                    imgSrc="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar11.jpg"
                    first_name={handyman.first_name}
                    last_name={handyman.last_name}
                    specialty={handyman.specialty}
                    details={handyman.details}
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
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedHandyman(null);
            }
          }}
        >
          <div className="bg-white p-12 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-4 text-xl text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedHandyman(null)}
            >
              &times;
            </button>
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar11.jpg"
              alt={selectedHandyman.first_name}
            />
            <h2 className="text-xl font-bold text-center text-[#a67905] mb-2">
              {selectedHandyman.first_name} {selectedHandyman.last_name}
              {selectedHandyman.rating != null ? (
                <>
                  <span>{` (${selectedHandyman.rating}/10)`}</span>
                  <IoStarSharp className="inline-block text-yellow-500 text-2xl ml-1 pb-1" />
                  {/* Star Icon */}
                </>
              ) : (
                ""
              )}
            </h2>
            <p className="text-center font-semibold text-muted text-[#525252]">
              {selectedHandyman.specialty}
            </p>
            <p className="text-center px-8 text-sm text-gray-700 mt-4">
              {selectedHandyman.details}
            </p>
            <div className="flex justify-center items-center">
              <a
                href={
                  selectedHandyman.email
                    ? `mailto:${selectedHandyman.email}`
                    : "javascript:void(0)"
                }
                className="bg-yellow-600 rounded-md px-5 py-2 text-white mt-6 hover:bg-yellow-700 transition-colors duration-100 ease-in-out mx-auto block"
              >
                Contact Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Handyman({ imgSrc, first_name, last_name, specialty, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center mr-5 text-center text-[#525252] mb-11 lg:mr-16 transform hover:scale-105 transition-transform duration-200 ease-in-out"
    >
      <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
        <img
          className="inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]"
          src={imgSrc}
          alt={`${first_name} avatar`}
        />
      </div>
      <div className="text-center">
        <div className="text-[#a67905] font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out">
          {first_name} {last_name}
        </div>
        <span className="block font-medium text-muted">{specialty}</span>
      </div>
    </button>
  );
}

Handyman.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Browse;
