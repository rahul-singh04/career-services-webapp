import React, { useEffect, useState } from 'react';
import JobCard from '../components/Jobcard';
import { getAllJobs } from '../api/StudentApi';
import { Fragment } from "react";
import {
  Dialog, DialogHeader, IconButton,
} from "@material-tailwind/react";
import JobApplyForm from '../components/JobApplyForm';
import { XMarkIcon } from "@heroicons/react/24/outline";


const JobList = () => {

  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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
    <Fragment>
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
            handleOpen={handleOpen}
          />
        ))}
      </div>
      <Dialog open={open} handler={handleOpen}>
        <div className='flex justify-end'>
        <IconButton variant="text" size="sm" onClick={handleOpen}>
          <XMarkIcon  className="h-4 w-4 " />
        </IconButton>
        </div>
        <div className='flex justify-center'>
          <DialogHeader>Apply Form</DialogHeader>
        </div>
        <div className='mx-4 mb-8 px-8'>
          <JobApplyForm />
        </div>
      </Dialog>
    </Fragment>
  );
};

export default JobList;
