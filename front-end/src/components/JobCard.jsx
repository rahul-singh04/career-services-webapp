import React, { useEffect, useState } from 'react';
import { getPhoto } from '../api/CommonApis';
import defaultProfile from '../assets/defaultProfile.png'
import { Button } from "@material-tailwind/react";
import { Fragment } from "react";
import {
  Dialog, DialogHeader, IconButton,
} from "@material-tailwind/react";
import JobApplyForm from '../components/JobApplyForm';
import { XMarkIcon } from "@heroicons/react/24/outline";

const JobCard = ({ id, jobTitle, companyName, location, dateAdded, jobDescription, workLocation, totalOpenings }) => {

  const date = new Date(dateAdded);
  const fullDate = date.toLocaleDateString();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getPhoto(id, authToken)
      .then((resp) => {
        if (resp) {
          setPhoto(resp);
        }
      })
      .catch((error) => {
        console.error('Error fetching photo:', error);
      });

  }, [id]);

  const handleApply = () => {
    handleOpen();
  };
  return (
    <Fragment>
    <div className="flex flex-row bg-white rounded-lg shadow-md p-6 mb-4 gap-4">
      <div className="flex items-center">
        <img src={photo || defaultProfile} alt={companyName} className="w-24 h-24 rounded-full border-2 border-gray-200 mr-2 object-cover" />
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
          <p className="text-gray-600 text-xs">Posted on: <span className='text-blue-500'>{fullDate}</span></p>
        </div>
        <div className='flex justify-between my-1'>
          <div className="bg-gray-100 my-2 p-2 w-fit rounded-md">
            <p className="text-xs  text-gray-600">Total Openings: <span className="text-gray-700 font-semibold">{totalOpenings}</span></p>
          </div>
          <Button size="sm" onClick={handleApply} variant="gradient" className='h-8 my-2'>Apply</Button>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <div className='flex justify-end'>
          <IconButton variant="text" size="sm" onClick={handleOpen}>
            <XMarkIcon className="h-4 w-4 " />
          </IconButton>
        </div>
        <div className='flex justify-center'>
          <DialogHeader>Apply Form</DialogHeader>
        </div>
        <div className='mx-4 mb-8 px-8'>
          <JobApplyForm id={id} />
        </div>
      </Dialog>
    </div>
    </Fragment>
  );
};

export default JobCard;
