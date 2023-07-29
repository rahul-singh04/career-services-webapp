import React, { useEffect, useState } from 'react'
import { getAllJobsAdmin } from '../api/AdminApi';
import JobCard from '../components/JobCard';

export const JobsAdminSide = () => {

    const [jobs, setJobs] = useState([]);
    const [deletedJob, setdeletedJob] = useState(false);


  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getAllJobsAdmin(authToken)
      .then((candidates) => {
        setJobs(candidates)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [deletedJob])

  function jobsStateChange() {
    setdeletedJob((prevState)=> !prevState)
  }

  return (
    <div className="w-1/2 mx-auto">
        <h2 className="text-2xl font-bold m-4 text-center">Job Listings</h2>
        {jobs && jobs.map((job) => (
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
            jobsStateChange={jobsStateChange}
          />
        ))}
      </div>
  )
}
