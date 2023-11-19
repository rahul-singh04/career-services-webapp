import React, { useEffect, useState } from "react";
import { getEmployerProfile, updateEmployerProfile } from "../api/EmployerApi";

const EmployerProfileForm = ({ onUpdateSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [totalNoOfEmp, setTotalNoOfEmp] = useState("");
  const [sector, setSector] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    setDisplayMessage("");
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    getEmployerProfile(authToken)
      .then((profileData) => {
        setFullName(profileData.fullName || "");
        setCompanyDesc(profileData.companyDesc || "");
        setTotalNoOfEmp(profileData.totalNoOfEmp || "");
        setSector(profileData.sector || "");
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any field is blank
    if (
      fullName.trim() === "" ||
      companyDesc.trim() === "" ||
      totalNoOfEmp.trim() === "" ||
      sector.trim() === ""
    ) {
      setDisplayMessage("All fields are required");
      return;
    }
    const formData = {
      fullName,
      companyDesc,
      totalNoOfEmp,
      sector,
    };
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    updateEmployerProfile(formData, authToken)
      .then(() => {
        setDisplayMessage("Profile Update Successful");
        setTimeout(() => {
          onUpdateSuccess();
        }, 1000);
      })
      .catch((error) => {
        setDisplayMessage("Error updating profile:");
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block font-semibold mb-1 text-black"
          >
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
          <label
            htmlFor="companyDesc"
            className="block font-semibold mb-1 text-black"
          >
            Company Description
          </label>
          <input
            type="text"
            id="companyDesc"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={companyDesc}
            onChange={(e) => setCompanyDesc(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="totalNoOfEmp"
            className="block font-semibold mb-1 text-black"
          >
            Total Number of Employees
          </label>
          <input
            type="text"
            id="totalNoOfEmp"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={totalNoOfEmp}
            onChange={(e) => setTotalNoOfEmp(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="sector"
            className="block font-semibold mb-1 text-black"
          >
            Sector
          </label>
          <input
            type="text"
            id="sector"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          />
        </div>
        {displayMessage && (
          <div className="my-2 p-2 w-full rounded-md text-center">
            <p
              className={
                displayMessage.includes("Successful")
                  ? "text-green-500 font-extrabold"
                  : "text-red-500 font-extrabold"
              }
            >
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

export default EmployerProfileForm;
