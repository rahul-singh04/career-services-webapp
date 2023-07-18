import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import {  getApplicants } from '../api/EmployerApi';

const ListAppliedCand = ({id}) => {

  const [candidateProfiles, setcandidateProfiles] = useState([]);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getApplicants(id , authToken)
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
      {candidateProfiles.length === 0 && <h2 className="text-2xl font-bold my-4 text-center">No Applications</h2>}
      {candidateProfiles && candidateProfiles.map((candidate) => (
        <CandidateCard
          key={candidate.user._id}
          id={candidate.user._id}
          fullName={candidate.user.fullName}
          location={candidate.user.location}
          phoneNumber={candidate.user.phoneNumber}
          linkedinProfile={candidate.user.linkedInProfile}
          githubProfile={candidate.user.githubProfile}
          bio={candidate.user.userBio}
        />
      ))}
    </div>
  );
};

export default ListAppliedCand;
