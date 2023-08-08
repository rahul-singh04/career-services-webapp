import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import { getAllCandidates } from '../api/EmployerApi';
import { Input } from "@material-tailwind/react";

const Candidates = () => {

  const [candidateProfiles, setCandidateProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getAllCandidates(authToken)
      .then((candidates) => {
        setCandidateProfiles(candidates)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(candidateProfiles);


  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // Filter candidates based on the search term
  const filteredCandidates = candidateProfiles?.filter((candidate) =>
  candidate.fullName &&
    candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.location && candidate.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-2/3 mx-auto">
      <h2 className="text-2xl font-bold my-4 text-center">Candidate Profiles</h2>
      <div className="flex justify-center mb-4">
        <div className='w-72'>
          <Input
            label="Search Candidates"
            icon={<i class="fa-brands fa-searchengin fa-lg"  />}
             value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {filteredCandidates && filteredCandidates.map((candidate) => (
        <CandidateCard
          key={candidate._id}
          candidateId={candidate._id}
          fullName={candidate.fullName}
          location={candidate.location}
          phoneNumber={candidate.phoneNumber}
          linkedinProfile={candidate.linkedInProfile}
          githubProfile={candidate.githubProfile}
          bio={candidate.userBio}
        />
      ))}
    </div>
  );
};

export default Candidates;
