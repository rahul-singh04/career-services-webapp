import React, { useEffect, useState } from 'react';
import { getApplications } from '../api/StudentApi';
import JobCard from '../components/JobCard';

const ApplicationCandidate = () => {

const [applications, setapplications] = useState([])

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getApplications(authToken)
      .then((candidates) => {
        setapplications(candidates)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div className="w-1/2 mx-auto">
    <h2 className="text-2xl font-bold m-4 text-center">Applications</h2>
    {applications && applications.map((application) => (
      <JobCard
        key={application._id}
        id={application.job?._id}
        jobTitle={application.job?.jobTitle}
        companyName={application.job?.fullName}
        location={application.job?.companyLocation}
        dateAdded={application.job?.datePosted}
        workLocation={application.job?.workLocation}
        totalOpenings={application.job?.totalOpenings}
        jobDescription={application.job?.jobDesc}
        companyId={application.job?.employerID}
        applications={applications}
        userName ={application.job?.username}
      />
    ))}
  </div>
  );
};

export default ApplicationCandidate;
