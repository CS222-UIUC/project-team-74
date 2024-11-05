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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Postings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">{job.title}</h2>
            <p className="text-gray-700">{job.description}</p>
            <p className="text-gray-700">Location: {job.location}</p>
            <p className="text-gray-700">Price: ${job.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostedJob;
