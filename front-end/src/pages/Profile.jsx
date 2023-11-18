import React, { useEffect, useState, useRef } from "react";
import { getCurrentUser } from "../api/authApi";
import CandidateProfileDisplay from "../components/CandidateProfileDisplay";

const Profile = () => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    setUserDetails(getCurrentUser());
  }, []);

  return (
    <div className="flex w-full bg-gray-100 justify-center">
      <div className="p-4 m-4 shadow-lg bg-white rounded-lg md:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Candidate Profile
        </h2>
        {userDetails && (
          <div className="flex flex-row gap-4 justify-center">
            <p className="mb-4">
              <span className="font-semibold">Email:</span> {userDetails.email}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Username:</span>{" "}
              {userDetails.username}
            </p>
          </div>
        )}
        <CandidateProfileDisplay />
      </div>
    </div>
  );
};

export default Profile;
