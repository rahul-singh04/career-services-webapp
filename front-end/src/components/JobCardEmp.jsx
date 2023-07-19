import React, { useEffect, useState } from 'react';
import { getPhoto } from '../api/CommonApis';
import defaultProfile from '../assets/defaultProfile.png'
import { Fragment } from "react";
import {
  Dialog
} from "@material-tailwind/react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ListAppliedCand from './ListAppliedCand';
import EditJob from './EditJob';
import { deleteJob } from '../api/EmployerApi';

const JobCardEmp = ({ id, jobTitle, companyName, location, dateAdded, jobDescription, workLocation, totalOpenings , settrigger , companyID }) => {

  const date = new Date(dateAdded);
  const fullDate = date.toLocaleDateString();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [photo, setPhoto] = useState(null);
  const [deleteMessage, setdeleteMessage] = useState('')

  const [openEdit, setopenEdit] = useState(false);
  const openDrawer = () => setopenEdit(true);
  const closeDrawer = () => {setopenEdit(false);  settrigger((prev)=>!prev) };

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getPhoto(companyID, authToken)
      .then((resp) => {
        if (resp) {
          setPhoto(resp);
        }
      })
      .catch((error) => {
        console.error('Error fetching photo:', error);
      });

  }, [id, deleteMessage]);

  const handleApply = () => {
    handleOpen();
  };
  
  const handleDelete = () => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    console.log(id);
    deleteJob(id, authToken)
    .then((resp) => {
      if (resp) {
        setdeleteMessage(resp);
        settrigger((prev)=>!prev)
      }
    })
    .catch((error) => {
      console.error('Error deleting Job:', error);
    });
  };

  return (
    <Fragment>
      <div className="flex flex-row bg-white rounded-lg shadow-md p-6 mb-4 gap-4">
        <div className="flex items-center">
          <img src={photo || defaultProfile} alt={companyName} className="w-24 h-24 rounded-full border-2 border-gray-200 mr-2 object-cover" />
        </div>
        <div className="flex flex-col w-full">
          <div className='flex justify-between'>
            <h3 className="text-xl font-bold text-gray-800">{jobTitle}</h3>
            <div className='flex gap-2'>
            <Button size="sm" color="orange" className=" p-2" onClick={openDrawer}>
              Edit
            </Button>
            <Button size="sm" color="deep-orange" className=" p-2" onClick={handleDelete}>
              Delete
            </Button>
            </div>
          </div>
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
            <Button size="sm" onClick={handleApply} variant="gradient" className='h-8 my-2'>Show Applicants</Button>
          </div>
        </div>
        <Dialog open={open} handler={handleOpen} >
          <div className='flex justify-end'>
            <IconButton variant="text" size="sm" onClick={handleOpen}>
              <XMarkIcon className="h-4 w-4 " />
            </IconButton>
          </div>
          <div className='mx-4 mb-8 px-8'>
            <ListAppliedCand id={id} />
          </div>
        </Dialog>
        <Drawer open={openEdit} onClose={closeDrawer} className="p-4" size={550}>
          <div className="mb-6 flex items-center justify-end">
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <EditJob onUpdateSuccess={closeDrawer}
           id={id} 
            jobTitle={jobTitle}
            companyName={companyName}
            location={location}
            dateAdded={dateAdded}
            workLocation={workLocation}
            totalOpenings={totalOpenings}
            jobDescription={jobDescription} />
        </Drawer>
      </div>
    </Fragment>
  );
};

export default JobCardEmp;
