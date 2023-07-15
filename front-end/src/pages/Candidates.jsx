import React from 'react';
import CandidateCard from '../components/CandidateCard';

const Candidates = () => {
  // Dummy data for candidate profiles
  const candidateProfiles = [
    {
      id: 1,
      fullName: 'John Doe',
      professionalSummary: 'Experienced frontend developer with expertise in React and JavaScript',
      location: 'New York, USA',
      phoneNumber: '+1 123-456-7890',
      linkedinProfile: 'https://www.linkedin.com/johndoe',
      githubProfile: 'https://github.com/johndoe',
      profileImage: 'https://example.com/profile-image-1.jpg',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      professionalSummary: 'Full-stack web developer with a passion for building scalable applications',
      location: 'San Francisco, USA',
      phoneNumber: '+1 987-654-3210',
      linkedinProfile: 'https://www.linkedin.com/janesmith',
      githubProfile: 'https://github.com/janesmith',
      profileImage: 'https://example.com/profile-image-2.jpg',
    },
    // Add more candidate profiles as needed
  ];

  return (
    <div className="w-2/3 mx-auto">
      <h2 className="text-2xl font-bold my-4 text-center">Candidate Profiles</h2>
      {candidateProfiles.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          fullName={candidate.fullName}
          professionalSummary={candidate.professionalSummary}
          location={candidate.location}
          phoneNumber={candidate.phoneNumber}
          linkedinProfile={candidate.linkedinProfile}
          githubProfile={candidate.githubProfile}
          profileImage={candidate.profileImage}
        />
      ))}
    </div>
  );
};

export default Candidates;
