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
    <div className="w-screen h-screen pt-10 pr-10 pb-8 pl-10 bg-gray-50">
      <h1 className="text-5xl font-extrabold mb-6 text-center" style={{ color: "#5e5555" }}>
        Job Postings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 pl-10 pr-10">
        {jobs.map(job => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#b38600"}}>
              {job.title}
            </h2>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <p className="text-gray-500 italic">Location: {job.location}</p>
            <p className="text-green-600 font-semibold mt-2">Price: ${job.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default PostedJob;
