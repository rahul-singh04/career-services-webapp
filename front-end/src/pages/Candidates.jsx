import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import { getAllCandidates } from '../api/EmployerApi';

const Candidates = () => {

  const [candidateProfiles, setcandidateProfiles] = useState([]);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getAllCandidates(authToken)
    .then((candidates)=>{
      setcandidateProfiles(candidates)
    })
    .catch((error)=>{
      console.log(error);
    })
   
  }, [])
  
  return (
    <div className="w-2/3 mx-auto">
      <h2 className="text-2xl font-bold my-4 text-center">Candidate Profiles</h2>
      {candidateProfiles && candidateProfiles.map((candidate) => (
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
