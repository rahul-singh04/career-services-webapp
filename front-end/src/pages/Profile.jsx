import React, { useEffect, useState, useRef } from 'react';
import { getCurrentUser } from '../api/authApi';
import { MdOutlineUploadFile } from 'react-icons/md';
import CandidateProfileForm from '../components/ProfileForm';

const Profile = () => {
  const [userDetails, setUserDetails] = useState();
  const [resume, setResume] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUserDetails(getCurrentUser());
  }, []);

  const handleResumeUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  return (
    <div className="flex  w-full bg-gray-100 justify-center ">
      <div className=" p-4 m-4 shadow-lg bg-white rounded-lg w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-center">Candidate Profile</h2>
        {userDetails && (
          <div className='flex flex-row gap-4 justify-center'>
            <p className="mb-4">
              <span className="font-semibold">Email:</span> {userDetails.email}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Username:</span> {userDetails.username}
            </p>
          </div>
        )}
        <div className='flex flex-row justify-center'>
              <div className="flex justify-center items-center">
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              {resume && (
                <p className="mt-4">
                  Uploaded Resume: {resume.name}
                </p>
              )}
            </div>
        <CandidateProfileForm />
      </div>
    </div>
  );
};

export default Profile;
