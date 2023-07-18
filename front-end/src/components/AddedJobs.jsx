import React, { useEffect, useState } from 'react';
import JobCardEmp from './JobCardEmp';
import { getJobsAdded } from '../api/EmployerApi';



const AddedJobs = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getJobsAdded(authToken)
      .then((jobs) => {
        setJobs(jobs)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
      <div className="w-1/2 mx-auto">
        <h2 className="text-2xl font-bold m-4 text-center">Job Listings</h2>
        {jobs.map((job) => (
          <JobCardEmp
            key={job._id}
            id={job._id}
            jobTitle={job.jobTitle}
            companyName={job.fullName}
            location={job.companyLocation}
            dateAdded={job.datePosted}
            workLocation={job.workLocation}
            totalOpenings={job.totalOpenings}
            jobDescription={job.jobDesc}
          />
        ))}
      </div>
  );
};

export default AddedJobs;
