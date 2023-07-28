import React, { useEffect, useState } from 'react';
import { getPhoto } from '../api/CommonApis';
import defaultProfile from '../assets/defaultProfile.png';
import { Button } from '@material-tailwind/react';
import { deleteUser } from '../api/AdminApi';

const EmployerCard = ({ id, fullName, email, sector, companyDesc, totalNoOfEmp , jobsStateChange}) => {
  const [photo, setphoto] = useState(null);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getPhoto(id, authToken)
      .then((resp) => {
        if (resp) {
          setphoto(resp);
        }
      })
      .catch((error) => {
        // console.error('Error fetching photo:', error);
      });
  }, [id]);

  const handleDelete = () => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    deleteUser(id, authToken)
    .then((resp) => {
      if (resp) {
        jobsStateChange();
      }
    })
    .catch((error) => {
      console.error('Error fetching photo:', error);
    });
  };


  return (
    <div className="flex flex-row bg-white rounded-lg shadow-md p-6 mb-4 gap-4">
      <div className="flex items-center">
        <img
          src={photo || defaultProfile}
          alt="image_profile"
          className="w-24 h-24 rounded-full border-2 border-gray-200 mr-2 object-cover"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
      <div className='flex mb-2 justify-between'>
        <h3 className="text-xl font-bold text-gray-800 mt-2">{fullName}</h3>
        <Button size="sm" onClick={handleDelete} variant="gradient" color="red" className='h-8 my-2'>Delete</Button> 
        </div>
        <p className="text-gray-600 text-sm mb-4">{companyDesc}</p>
        <div className="flex items-center justify-between">
          <p className="text-blue-500 text-xs">{sector}</p>
          <p className="text-gray-600 text-xs">Email: {email}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-gray-600 text-xs">Total Employees: {totalNoOfEmp}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerCard;
