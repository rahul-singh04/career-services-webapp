import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { getAllJobs } from '../api/StudentApi';
import { Input } from "@material-tailwind/react";

const JobList = () => {

  const [jobs, setJobs] = useState();
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredJobs = jobs?.filter((job) =>
  job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
   || (job.employerID.fullName && job.employerID.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
);
console.log(jobs);


  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-2xl font-bold m-4 text-center">Job Listings</h2>
      <div className="flex justify-center mb-4">
        <div className='w-72'>
          <Input
            label="Search Jobs"
            icon={<i class="fa-brands fa-searchengin fa-lg"  />}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {filteredJobs && filteredJobs.map((job) => (
        <JobCard
          key={job._id}
          id={job._id}
          jobTitle={job.jobTitle}
          companyName={job.employerID.fullName}
          location={job.companyLocation}
          dateAdded={job.datePosted}
          workLocation={job.workLocation}
          totalOpenings={job.totalOpenings}
          jobDescription={job.jobDesc}
          companyId={job.employerID._id }
        />
      ))}
    </div>
  );
};

export default JobList;
