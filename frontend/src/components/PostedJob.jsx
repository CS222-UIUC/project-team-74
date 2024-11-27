import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostedJob.css";

const PostedJob = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/job-postings/jobs/")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the job postings!", error);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show3");
        } else {
          entry.target.classList.remove("show3");
        }
      });
    }, {});

    const hiddenElements = document.querySelectorAll(".hidden3");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [jobs, searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show2");
        } else {
          entry.target.classList.remove("show2");
        }
      });
    }, {});

    const hiddenElements = document.querySelectorAll(".hidden2");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [jobs, searchTerm]);

  // Filter job based on the search term
  const filteredJob = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="max-w-full max-h-full pt-10 pr-10 pb-8 pl-10 bg-white">
        <h1 className="text-[3.5rem] font-bold mb-6 text-center text-green-700 font-fraunces hidden2">
          Job Postings
        </h1>

        {/* Search Bar */}
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search by job title/location"
            className="w-64 px-6 py-2 border rounded-lg shadow-sm bg-white text-[#525252] font-fraunces"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pl-10 pr-10 pb-20">
          {filteredJob.map((job) => (
            <button
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 hidden3" // hidden2 class applied here
              onClick={() => setSelectedJob(job)}
            >
              <h2 className="text-2xl font-bold mb-2 text-[#b38600]">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <p className="text-blue-800 italic font-semibold">
                Location: {job.location}
              </p>
              <p className="text-green-600 font-semibold mt-2">
                Price: ${job.price}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedJob && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedJob(null);
            }
          }}
        >
          <div className="bg-white p-12 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-4 text-3xl text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedJob(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-8 text-[#b38600]">
              {selectedJob.title}
            </h2>
            <p className="text-gray-600 mb-4">{selectedJob.description}</p>
            <p className="text-blue-800 italic font-semibold">
              Location: {selectedJob.location}
            </p>
            <p className="text-green-600 font-semibold mt-2">
              Price: ${selectedJob.price}
            </p>
            <p className="text-red-800 font-semibold mt-2">
              Request by: {selectedJob.user.first_name ? selectedJob.user.first_name + " " + selectedJob.user.last_name   : "N/A"}
            </p>
            <div className="flex justify-center items-center">
              <a
                href={selectedJob.user.email ? `mailto:${selectedJob.user.email}` : "javascript:void(0)"}
                className="bg-[#b38600] rounded-md px-5 py-2 text-white mt-6 hover:bg-yellow-700 transition-colors duration-100 ease-in-out mx-auto block"
              >
                Contact Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostedJob;
