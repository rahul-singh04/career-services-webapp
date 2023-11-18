import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getAllApplications } from "../api/AdminApi";
import { useLocation } from "react-router-dom";

const ApplicationsAdmin = () => {
  const [applications, setapplications] = useState([]);
  const location = useLocation();
  const [deletedJob, setdeletedJob] = useState(false);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    getAllApplications(authToken)
      .then((candidates) => {
        setapplications(candidates);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function jobsStateChange() {
    setdeletedJob((prevState) => !prevState);
  }

  return (
    <div className="p-4 md:w-1/2 mx-auto">
      <h2 className="text-2xl font-bold m-4 text-center">Job Listings</h2>
      {applications &&
        applications.map((application) => (
          <JobCard
            key={application._id}
            id={application._id}
            jobTitle={application.job?.jobTitle}
            companyName={application.job?.fullName}
            location={application.job?.companyLocation}
            dateAdded={application.job?.datePosted}
            workLocation={application.job?.workLocation}
            totalOpenings={application.job?.totalOpenings}
            jobDescription={application.job?.jobDesc}
            companyId={application.job?.employerID}
            applications={applications}
            path={location.pathname}
            jobsStateChange={jobsStateChange}
          />
        ))}
    </div>
  );
};

export default ApplicationsAdmin;
