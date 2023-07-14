import React, { useEffect, useState, useRef } from 'react';
import { getCurrentUser } from '../api/authApi';
import { MdOutlineUploadFile } from 'react-icons/md';

const Profile = () => {
  const [userDetails, setUserDetails] = useState();
  const [resume, setResume] = useState(null);
  const fileInputRef = useRef(null);

  console.log(userDetails);
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
    <div className="flex h-full w-full bg-gray-100 justify-center ">
      <div className=" p-8 m-8 shadow-lg bg-white rounded-lg w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile Page</h1>
        {userDetails && (
          <div>
            <p className="mb-4">
              <span className="font-semibold">Email:</span> {userDetails.email}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Username:</span> {userDetails.username}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Roles:</span> {userDetails.roles.join(', ')}
            </p>
            <div className="flex justify-center items-center">
              <label htmlFor="resume-upload" className=" flex bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                <MdOutlineUploadFile size={40} onClick={handleResumeUpload} />
                <p className='pt-2'>Upload Resume</p>
              </label>
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
        )}
      </div>
    </div>
  );
};

export default Profile;
