import React, { useState } from "react";
import { postJob } from "../api/EmployerApi";

const AddJobs = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companylocation, setcompanylocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [totalOpenings, setTotalOpenings] = useState("");
  const [worklocation, setworklocation] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      jobTitle.trim() === "" ||
      worklocation.trim() === "" ||
      companylocation.trim() === "" ||
      jobDescription.trim() === "" ||
      totalOpenings.trim() === ""
    ) {
      setDisplayMessage("All fields are required");
      return;
    }

    const formData = {
      jobTitle: jobTitle,
      companyLocation: companylocation,
      jobDesc: jobDescription,
      workLocation: worklocation,
      totalOpenings: totalOpenings,
    };

    const authToken = JSON.parse(localStorage.getItem("user")).accessToken;
    postJob(formData, authToken)
      .then((response) => {
        if (response) {
          setDisplayMessage("Job Posted");
          setTimeout(() => {
            setJobTitle("");
            setcompanylocation("");
            setworklocation("");
            setJobDescription("");
            setTotalOpenings("");
          }, 1000);
        } else {
          setDisplayMessage("Error posting job: Please contact Support");
        }
      })
      .catch((error) => {
        console.error("Error posting job:", error);
      });
  };

  return (
    <div className="flex w-full">
      <div className=" w-4/5 md:w-2/3 mx-auto gap-8">
        <h2 className="text-2xl font-bold my-4 text-center">Add Jobs</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="jobTitle" className="block font-semibold mb-1">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value), setDisplayMessage("");
              }}
              placeholder="Example: Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>

          <div>
            <label htmlFor="location" className="block font-semibold mb-1">
              Company Location
            </label>
            <input
              type="text"
              id="location"
              value={companylocation}
              onChange={(e) => {
                setcompanylocation(e.target.value), setDisplayMessage("");
              }}
              placeholder="Example: San Francisco, CA"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="block font-semibold mb-1"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value), setDisplayMessage("");
              }}
              placeholder="Example: We are seeking a highly motivated software engineer with experience in web development..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2 h-32"
            ></textarea>
          </div>

          <div>
            <label htmlFor="totalOpenings" className="block font-semibold mb-1">
              Work Location
            </label>
            <input
              type="text"
              id="totalOpenings"
              value={worklocation}
              onChange={(e) => {
                setworklocation(e.target.value), setDisplayMessage("");
              }}
              placeholder="Example: 5"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>

          <div>
            <label htmlFor="totalOpenings" className="block font-semibold mb-1">
              Total Openings
            </label>
            <input
              type="text"
              id="totalOpenings"
              value={totalOpenings}
              onChange={(e) => {
                setTotalOpenings(e.target.value), setDisplayMessage("");
              }}
              placeholder="Example: 5"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>
          {displayMessage && (
            <div className="my-2 p-2 w-full rounded-md text-center">
              <p
                className={
                  displayMessage.includes("Posted")
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobs;
