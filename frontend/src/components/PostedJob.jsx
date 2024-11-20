import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostedJob = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/job-postings/jobs/')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the job postings!', error);
      });
  }, []);

  return (
    <div className="max-w-full max-h-full pt-10 pr-10 pb-8 pl-10 bg-white">
      <h1 className="text-[3.5rem] font-bold mb-6 text-center text-green-700 font-fraunces">
        Job Postings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 pt-2 pl-10 pr-10 pb-20 ">
        {jobs.map(job => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-2 text-[#b38600]">
              {job.title}
            </h2>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <p className="text-blue-800 italic font-semibold">Location: {job.location}</p>
            <p className="text-green-600 font-semibold mt-2">Price: ${job.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default PostedJob;
