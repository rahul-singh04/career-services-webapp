import React, { useEffect, useState } from 'react';
import {  updateJob } from '../api/EmployerApi';

const EditJob = ({onUpdateSuccess ,id, jobTitle, location, jobDescription, workLocation, totalOpenings }) => {
  const [jobTitleEdit, setJobTitle] = useState(jobTitle);
  const [companylocationEdit, setcompanylocation] = useState(location);
  const [jobDescriptionEdit, setJobDescription] = useState(jobDescription);
  const [totalOpeningsEdit, setTotalOpenings] = useState(totalOpenings);
  const [worklocationEdit, setworklocation] = useState(workLocation);
  const [displayMessage, setDisplayMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (
        jobTitleEdit.trim() === '' ||
        companylocationEdit.trim() === '' ||
        worklocationEdit.trim() === '' ||
      jobDescriptionEdit.trim() === '' ||
      totalOpeningsEdit.trim() === ''
    ) {
      setDisplayMessage('All fields are required');
      return;
    }
  
    const formData = {
      jobTitle: jobTitleEdit,
      companyLocation:companylocationEdit,
      jobDesc: jobDescriptionEdit,
      workLocation: worklocationEdit,
      totalOpenings: totalOpeningsEdit
    }

    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;

    updateJob(id, formData, authToken)
      .then((response) => {
        if(response){
          setDisplayMessage('Job Updated');
            onUpdateSuccess();
        }else{
          setDisplayMessage('Error posting job: Please contact Support');
        }
      })
      .catch((error) => {
        console.error('Error posting job:', error);
      });
  };

    useEffect(() => {
      setDisplayMessage('')
    }, [onUpdateSuccess])


  return (
    <div className='flex w-full'>
      <div className='w-full  p-2'>
        <h2 className='text-2xl font-bold my-4 text-center'>Edit Job</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="jobTitle" className="block font-semibold mb-1">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitleEdit}
              onChange={(e) => {setJobTitle(e.target.value),setDisplayMessage('');}}
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
              value={companylocationEdit}
              onChange={(e) => {setcompanylocation(e.target.value) ,setDisplayMessage('');}}
              placeholder="Example: San Francisco, CA"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>

          <div>
            <label htmlFor="jobDescription" className="block font-semibold mb-1">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescriptionEdit}
              onChange={(e) =>{ setJobDescription(e.target.value) ,setDisplayMessage('');}}
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
              value={worklocationEdit}
              onChange={(e) => {setworklocation(e.target.value),setDisplayMessage('');}}
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
              value={totalOpeningsEdit}
              onChange={(e) => {setTotalOpenings(e.target.value),setDisplayMessage('');}}
              placeholder="Example: 5"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
            />
          </div>
          {displayMessage && (
          <div className="my-2 p-2 w-full rounded-md text-center">
            <p
              className={
                displayMessage.includes('Updated')
                  ? 'text-green-500 font-extrabold'
                  : 'text-red-500 font-extrabold'
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

export default EditJob;
