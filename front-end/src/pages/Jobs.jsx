import React from 'react';
import JobCard from '../components/Jobcard';

const JobList = () => {
  // Dummy data for job listings
  const jobListings = [
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      companyName: 'ABC Company',
      location: 'New York, USA',
      dateAdded: '2023-07-15',
      totalOpenings: 3,
      jobDescription: 'We are seeking a skilled Frontend Developer to join our team...',
    },
    {
      id: 2,
      jobTitle: 'Backend Developer',
      companyName: 'XYZ Corporation',
      location: 'San Francisco, USA',
      dateAdded: '2023-07-14',
      totalOpenings: 2,
      jobDescription: 'We are looking for an experienced Backend Developer to... We are looking for an experienced Backend Developer to..We are looking for an experienced Backend Developer to..',
    },
    // Add more job listings as needed
  ];
  
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-2xl font-bold m-4 text-center">Job Listings</h2>
      {jobListings.map((job) => (
        <JobCard
          key={job.id}
          jobTitle={job.jobTitle}
          companyName={job.companyName}
          location={job.location}
          dateAdded={job.dateAdded}
          totalOpenings={job.totalOpenings}
          jobDescription={job.jobDescription}
        />
      ))}
    </div>
  );
};

export default JobList;
