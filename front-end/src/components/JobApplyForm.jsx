import React, { useEffect, useRef, useState } from "react";
import {
  applyJob,
  getProfile,
  getResume,
  updateResume,
} from "../api/StudentApi";
import { Button } from "@material-tailwind/react";

const JobApplyForm = ({ id }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [resume, setResume] = useState(null);
  const [displayMessage, setdisplayMessage] = useState("");
  const [resumeOnServer, setresumeOnServer] = useState(null);
  const fileInputRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (fullName.trim() === "" || email.trim() === "" || phone.trim() === "") {
      setdisplayMessage("All fields should be filled");
      return;
    }
    // const formData = {
    //     jobId: jobId,
    //     fullName: fullName,
    //     email: email,
    //     phone: phone,
    //     resume: resume,
    // };
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    // console.log(formData);
    applyJob(id, authToken)
      .then((resp) => {
        if (resp) {
          setdisplayMessage("Job Applied successfully");
        } else {
          setdisplayMessage("Unsuccessfull");
        }
      })
      .catch((error) => {
        console.error("Error applying job:", error);
      });
  };

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    getProfile(authToken)
      .then((profileData) => {
        setFullName(profileData.fullName);
        setEmail(profileData.email);
        setPhone(profileData.phoneNumber);
        setlinkedin(profileData.linkedInProfile);
        setresumeOnServer(profileData.resumeUploaded);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleResumeUpload = (e) => {
    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    updateResume(formData, authToken)
      .then((resp) => {
        if (resp) {
          setdisplayMessage("Resume uploaded successfully");
        } else {
          setdisplayMessage("Resume upload unsuccessful");
        }
      })
      .catch((error) => {
        console.error("Error uploading photo:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleFormSubmit}>
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
            htmlFor="email"
            className="block font-semibold mb-1 text-black"
          >
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
          <label
            htmlFor="phone"
            className="block font-semibold mb-1 text-black"
          >
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
          <label
            htmlFor="github"
            className="block font-semibold mb-1 text-black"
          >
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
        <div className="flex mb-4 justify-end">
          <input
            type="file"
            id="resume"
            className="hidden"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleResumeUpload}
          />
          <Button size="sm" onClick={() => fileInputRef.current.click()}>
            Upload Resume
          </Button>
        </div>
        {/* {resumeOnServer && <div className="mb-4">
                    <label htmlFor="resumeOnServer" className="block font-semibold mb-1">
                        Resume On Server
                    </label>
                    <input
                        type="checkbox"
                        id="resumeOnServer"
                        onChange={() => setresumeOnServer(!resumeOnServer)}
                        className="mr-2"
                    />
                    <span>Resume On Server</span>
                </div>} */}
        {displayMessage && (
          <p
            className={`font-extrabold text-center mb-4 ${
              displayMessage.includes("successfully")
                ? "text-green-500 font-extrabold"
                : "text-red-500 font-extrabold"
            }`}
          >
            {displayMessage}
          </p>
        )}
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
