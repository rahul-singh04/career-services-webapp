import React, { useEffect, useState } from 'react';
import { TagsInput } from "react-tag-input-component";
import { getProfile, updateProfile } from '../api/StudentApi';

const CandidateProfileForm = ({ onUpdateSuccess }) => {

  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');

  const [profileInfo, setProfileInfo] = useState(null);
  const [displayMessage, setdisplayMessage] = useState('')
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([
    { companyName: '', title: '', startDate: '', endDate: '' },
  ]);


  useEffect(() => {
    setdisplayMessage('')
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getProfile(authToken)
      .then((profileData) => {
        setProfileInfo(profileData);
        setFullName(profileData.fullName || '');
        setLocation(profileData.location || '');
        setPhoneNumber(profileData.phoneNumber || '');
        setLinkedin(profileData.linkedInProfile || '');
        setTwitter(profileData.twitterProfile || '');
        setGithub(profileData.githubProfile || '');
        setSkills(profileData.skills || []);
        setExperiences(profileData.professionalSummary)
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [name]: value,
    };
    setExperiences(updatedExperiences);
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    setExperiences([...experiences, { companyName: '', title: '', startDate: '', endDate: '' }]);
  };

  const handleRemoveExperience = (e, index) => {
    e.preventDefault();
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any field is blank
    if (
      fullName.trim() === '' ||
      location.trim() === '' ||
      phoneNumber.trim() === '' ||
      linkedin.trim() === '' ||
      twitter.trim() === '' ||
      github.trim() === ''
    ) {
      setdisplayMessage('All fields are required');
      return;
    }
    const formData = {
      fullName: fullName,
      location: location,
      phoneNumber: phoneNumber,
      linkedInProfile: linkedin,
      twitterProfile: twitter,
      githubProfile: github,
      skills,
      professionalSummary: experiences
    };
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    updateProfile(formData, authToken)
      .then((response) => {
        if (response) {
          setdisplayMessage('Profile Update Successful')
          setTimeout(() => {
            onUpdateSuccess();
          }, [1000])
        } else {
          setdisplayMessage('Error updating profile:')
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };


  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="linkedin" className="block font-semibold mb-1">
            LinkedIn Profile
          </label>
          <input
            type="text"
            id="linkedin"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="twitter" className="block font-semibold mb-1">
            Twitter Profile
          </label>
          <input
            type="text"
            id="twitter"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="github" className="block font-semibold mb-1">
            GitHub Profile
          </label>
          <input
            type="text"
            id="github"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block font-semibold mb-1">
            Skills
          </label>
          <TagsInput
            value={skills}
            onChange={setSkills}
            name="skills"
            placeHolder="Type your skills"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="skills" className="block font-semibold mb-1">
            Professional Summary
          </label>
          <button className='mb-2' onClick={handleAddExperience}>Add Experience</button>
          {experiences.length > 0 && experiences.map((experience, index) => (
            <div className="border p-2 mb-2" key={index}>
              <input
                type="text"
                name="companyName"
                value={experience.companyName}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Company Name"
                className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="title"
                value={experience.title}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Title"
                className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="startDate"
                value={experience.startDate.length > 0 ? new Date(experience.startDate).toISOString().split("T")[0] : ''}
                onChange={(e) => handleInputChange(index, e)}
                className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="endDate"
                value={experience.endDate.length > 0 ? new Date(experience.endDate).toISOString().split("T")[0] : ''}
                onChange={(e) => handleInputChange(index, e)}
                className="block w-full py-2 px-3 mb-2 border border-gray-300 rounded-md"
              />
              {index >= 0 && <button className="mx-2 py-2 px-4 bg-red-500 text-white rounded-md" onClick={(e) => handleRemoveExperience(e, index)}>Remove</button>}
            </div>
          ))}
        </div>
        {displayMessage && (
          <div className="my-2 p-2 w-full rounded-md text-center">
            <p className={displayMessage.includes('Successful') ? 'text-green-500 font-extrabold' : 'text-red-500 font-extrabold'}>
              {displayMessage}
            </p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CandidateProfileForm;