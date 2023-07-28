import React, { useEffect, useState } from 'react';
import { getApplications } from '../api/StudentApi';
import NotificationItem from './NotificationItem';

export const Notifications = () => {
  const [applications, setApplications] = useState([]);


const filterObjectsWithoutStatusNew = (arrayOfObjects) => {
    return arrayOfObjects.filter((object) => {
      return !('status' in object) || object.status !== 'New';
    });
  };
  


  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getApplications(authToken)
      .then((data) => {
        const arrayOfObjects = Object.values(data).map((item) => ({ ...item }));
        setApplications(filterObjectsWithoutStatusNew(arrayOfObjects));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(applications);

  return (
    <div className='w-48'>
        <p className="text-sm text-center mb-1 text-red-600 font-medium ">Interview Invites</p>
      {applications &&
        applications.map((notification, index) => (
          <NotificationItem
            key={index}
            companyLocation={notification.job.companyLocation}
            jobTitle={notification.job.jobTitle}
            workLocation={notification.job.workLocation}
          />
        ))}
    </div>
  );
};
