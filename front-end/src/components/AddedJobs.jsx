import React, { useEffect, useState } from "react";
import JobCardEmp from "./JobCardEmp";
import { getJobsAdded } from "../api/EmployerApi";

const AddedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [trigger, settrigger] = useState(false);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    getJobsAdded(authToken)
      .then((jobs) => {
        setJobs(jobs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trigger]);

  return (
    <div className="p-4 md:w-1/2 mx-auto">
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
          settrigger={settrigger}
          companyID={job.employerID}
        />
      ))}
    </div>
  );
};

export default AddedJobs;
