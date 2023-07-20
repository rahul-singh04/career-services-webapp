import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { getAllJobs } from '../api/StudentApi';



const JobList = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getAllJobs(authToken)
      .then((candidates) => {
        setJobs(candidates)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
      <div className="w-1/2 mx-auto">
        <h2 className="text-2xl font-bold m-4 text-center">Job Listings</h2>
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            id={job._id}
            jobTitle={job.jobTitle}
            companyName={job.fullName}
            location={job.companyLocation}
            dateAdded={job.datePosted}
            workLocation={job.workLocation}
            totalOpenings={job.totalOpenings}
            jobDescription={job.jobDesc}
            companyId= {job.employerID._id}
          />
        ))}
      </div>
  );
};

export default JobList;
