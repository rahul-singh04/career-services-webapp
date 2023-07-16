import React, { useState } from 'react';
import LocationAuto from '../components/locationAuto';

const AddJobs = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [dateAdded, setDateAdded] = useState(new Date().toISOString().slice(0, 10));
  const [jobDescription, setJobDescription] = useState('');
  const [totalOpenings, setTotalOpenings] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic with the field values
    // ...
  };

  return (
    <div className='flex w-full'>
      <div className='w-2/3 mx-auto gap-8'>
        <h2 className='text-2xl font-bold my-4 text-center'>Add Jobs</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="jobTitle" className="block font-semibold mb-1">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Example: San Francisco, CA"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>

          <div>
            <label htmlFor="dateAdded" className="block font-semibold mb-1">
              Date Added
            </label>
            <input
              type="text"
              id="dateAdded"
              value={dateAdded}
              readOnly
              placeholder="Automatically filled with the current date"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>

          <div>
            <label htmlFor="jobDescription" className="block font-semibold mb-1">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
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
              value={totalOpenings}
              onChange={(e) => setTotalOpenings(e.target.value)}
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
              onChange={(e) => setTotalOpenings(e.target.value)}
              placeholder="Example: 5"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>

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
