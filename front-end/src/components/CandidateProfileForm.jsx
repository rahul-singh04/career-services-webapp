import React, { useEffect, useState } from 'react';
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
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);


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
      location:location,
      phoneNumber :phoneNumber,
      linkedInProfile: linkedin,
      twitterProfile: twitter,
      githubProfile: github,
    };
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    updateProfile(formData, authToken)
      .then(() => {
        setdisplayMessage('Profile Update Successful')
        setTimeout(() => {
          onUpdateSuccess();
        }, [1000])
      })
      .catch((error) => {
        setdisplayMessage('Error updating profile:')
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
