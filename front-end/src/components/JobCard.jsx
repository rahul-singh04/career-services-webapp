import React from 'react';

const JobCard = ({ jobTitle, companyName, location, dateAdded, imageUrl, jobDescription, workLocation, totalOpenings }) => {
  return (
    <div className="flex flex-row bg-white rounded-lg shadow-md p-6 mb-4 gap-4">
      <div className="flex items-center">
        <img src={imageUrl} alt={companyName} className="w-24 h-24 rounded-full border-2 border-gray-200 mr-2 object-cover" />
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-bold text-gray-800">{jobTitle}</h3>
        <p className="text-blue-600 text-xs font-medium mb-2">{companyName}</p>
        <p className="text-gray-600 text-sm mb-4">{jobDescription}</p>
        <div className="flex items-center justify-between">
          <div className='flex gap-2'>
          <p className="text-blue-500 text-xs">{location}</p>
          <p className="text-blue-500 text-xs">({workLocation})</p>
          </div>
          <p className="text-gray-600 text-xs">Posted on: <span className='text-blue-500'>{dateAdded}</span></p>
        </div>
        <div className="bg-gray-100 my-2 p-2 w-fit rounded-md">
          <p className="text-xs  text-gray-600">Total Openings: <span className="text-gray-700 font-semibold">{totalOpenings}</span></p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
