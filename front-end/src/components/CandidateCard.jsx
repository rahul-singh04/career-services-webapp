import React, { useEffect, useState } from "react";
import { getPhoto } from "../api/CommonApis";
import defaultProfile from "../assets/defaultProfile.png";
import { Button } from "@material-tailwind/react";
import { deleteUser } from "../api/AdminApi";
import { useLocation } from "react-router-dom";
import { callInterview } from "../api/EmployerApi";

const CandidateCard = ({
  candidateId,
  fullName,
  bio,
  location,
  phoneNumber,
  linkedinProfile,
  githubProfile,
  jobsStateChange,
  jobId,
  status,
  settrigger,
}) => {
  const [photo, setphoto] = useState(null);
  const [role, setRole] = useState(null);
  const URLlocation = useLocation();

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    setRole(JSON.parse(localStorage.getItem("user")).roles[0].slice(5));
    getPhoto(candidateId, authToken)
      .then((resp) => {
        if (resp) {
          setphoto(resp);
        }
      })
      .catch((error) => {
        // console.error('Error fetching photo:', error);
      });
  }, [candidateId]);

  const handleDelete = () => {
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    deleteUser(candidateId, authToken)
      .then((resp) => {
        if (resp) {
          jobsStateChange();
        }
      })
      .catch((error) => {
        console.error("Error fetching photo:", error);
      });
  };

  const handleInvite = () => {
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    callInterview(candidateId, jobId, authToken)
      .then((resp) => {
        if (resp) {
          console.log("Interview posted");
          settrigger((prevVal) => !prevVal);
        }
      })
      .catch((error) => {
        console.error("Error fetching photo:", error);
      });
  };

  return (
    <div className="flex flex-row bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 gap-4">
      <div className="flex items-center w-1/5">
        <img
          src={(photo && photo) || defaultProfile}
          alt="image_profile"
          className="w-24 h-24 rounded-full border-2 border-gray-200 mr-2 object-cover"
        />
      </div>
      <div className="flex flex-col w-4/5 gap-2">
        <div className="flex mb-2 justify-between">
          <h3 className="md:text-xl font-bold text-gray-800 mt-2">
            {fullName}
          </h3>
          {role === "ADMIN" && (
            <Button
              size="sm"
              onClick={handleDelete}
              variant="gradient"
              color="red"
              className="h-8 my-2"
            >
              Delete
            </Button>
          )}
          {role === "EMPLOYER" &&
            URLlocation.pathname === "/jobsAdded" &&
            status === "New" && (
              <Button
                size="sm"
                onClick={handleInvite}
                variant="gradient"
                color="light-green"
                className="h-8 my-2"
              >
                Invite
              </Button>
            )}
          {status != "New" && URLlocation.pathname === "/jobsAdded" && (
            <div className="bg-gray-100 my-2 p-2 px-4 w-fit rounded-md">
              <p className="text-xs  text-gray-600">Invited</p>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{bio}</p>
        <div className="flex items-center justify-between">
          <p className="text-blue-500 text-xs">{location}</p>
          <p className="text-gray-600 text-xs">Phone: {phoneNumber}</p>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row ">
          <p className="text-gray-600 text-xs">
            LinkedIn:{" "}
            <a href={linkedinProfile} className="text-blue-500">
              {linkedinProfile}
            </a>
          </p>
          <p className="text-gray-600 text-xs ">
            GitHub:{" "}
            <a href={githubProfile} className="text-blue-500">
              {githubProfile}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
