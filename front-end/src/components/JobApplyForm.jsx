import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/StudentApi';

const JobApplyForm = ({ jobId, onApply }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setlinkedin] = useState('');
  const [resume, setResume] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (fullName.trim() === '' || email.trim() === '' || phone.trim() === '' || !resume) {
      // Display error message or perform necessary validation
      return;
    }

    // Create form data object
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('resume', resume);cand

    // Pass form data to the onApply callback
    onApply(formData);
  };

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getProfile(authToken)
    .then((profileData) => {
        console.log(profileData);
        setFullName(profileData.fullName)
        setEmail(profileData.email)
        setPhone(profileData.phoneNumber)
        setlinkedin(profileData.linkedInProfile)
    })
    .catch((error) => {
        console.error('Error fetching profile:', error);
    });
   
  }, [])
  

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleFormSubmit}>
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
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="github" className="block font-semibold mb-1">
            Linkedin Link
          </label>
          <input
            type="text"
            id="github"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={linkedin}
            onChange={(e) => setlinkedin(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block font-semibold mb-1">
            Resume
          </label>
          <input
            type="file"
            id="resume"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default JobApplyForm;
