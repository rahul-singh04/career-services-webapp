import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/AdminApi';
import CandidateCard from '../components/CandidateCard';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import EmployerCard from '../components/EmployerCard';

export const AllUsersAdminSide = () => {
  const [candidates, setcandidates] = useState([]);
  const [employers, setemployers] = useState([]);

  const [deletedJob, setdeletedJob] = useState(false);

  const filterObjectsWithSectorKey = (arrayOfObjects) => {
    return arrayOfObjects.filter((object) => {
      return Object.prototype.hasOwnProperty.call(object, 'sector');
    });
  };

  const filterObjectsWithresumeUploadedKey = (arrayOfObjects) => {
    return arrayOfObjects.filter((object) => {
      return Object.prototype.hasOwnProperty.call(object, 'githubProfile');
    });
  };

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getAllUsers(authToken)
      .then((users) => {
        const arrayOfObjects = Object.values(users).map((item) => ({ ...item }));
        setemployers(filterObjectsWithSectorKey(arrayOfObjects));
        setcandidates(filterObjectsWithresumeUploadedKey(arrayOfObjects));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deletedJob]);

  console.log();

  const data = [
    {
      label: 'Candidates',
      value: 'Candidates',
    },
    {
      label: 'Employer',
      value: 'Employer',
    },
  ];

  function jobsStateChange() {
    setdeletedJob((prevState)=> !prevState)
  }
  return (
    <div className="w-2/3 mx-auto">
      <h2 className="text-2xl font-bold my-4 text-center">User Profiles</h2>
      <Tabs value="Candidates">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value }) => (
            <TabPanel key={value} value={value}>
              {value === 'Candidates' &&
                candidates.map((user) => (
                  <CandidateCard
                    key={user._id}
                    id={user._id}
                    fullName={user.fullName}
                    location={user.location}
                    phoneNumber={user.phoneNumber}
                    linkedinProfile={user.linkedInProfile}
                    githubProfile={user.githubProfile}
                    bio={user.userBio}
                    jobsStateChange={jobsStateChange}
                  />
                ))}
              {value === 'Employer' && 
              employers.map((employer) => (
                <EmployerCard
                  key={employer._id}
                  id={employer._id}
                  fullName={employer.fullName}
                  email={employer.email}
                  sector={employer.sector}
                  companyDesc={employer.companyDesc}
                  totalNoOfEmp={employer.totalNoOfEmp}
                  jobsStateChange={jobsStateChange}
                />
              ))
              }
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};
