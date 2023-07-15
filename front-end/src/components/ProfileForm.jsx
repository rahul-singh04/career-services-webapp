import React, { useState } from 'react';

const CandidateProfileForm = () => {
  const [fullName, setFullName] = useState('');
  const [summary, setSummary] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any additional actions with the form data, such as saving it to a database

    // Clear form fields after submission
    setFullName('');
    setSummary('');
    setLocation('');
    setPhoneNumber('');
    setLinkedin('');
    setTwitter('');
    setGithub('');
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
          <label htmlFor="summary" className="block font-semibold mb-1">
            Professional Summary
          </label>
          <textarea
            id="summary"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
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
