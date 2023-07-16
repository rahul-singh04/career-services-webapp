import React, { useEffect, useState } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getEmployerProfile } from '../api/EmployerApi';
import EmployerProfileForm from './EmployerProfileForm';

const EmployerProfileDisplay = () => {
    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [profileInfo, setProfileInfo] = useState();

    useEffect(() => {
        const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
        getEmployerProfile(authToken)
            .then((profileData) => {
                setProfileInfo(profileData);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, [open]);

    return (
        <React.Fragment>
            <div className="max-w-lg mx-auto">
                <div className="flex justify-end mb-4">
                    <Button onClick={openDrawer}>Edit</Button>
                </div>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block font-semibold mb-1">
                        Company Name
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600"> {profileInfo && profileInfo.fullName}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block font-semibold mb-1">
                    Description
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600">{profileInfo && profileInfo.companyDesc}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block font-semibold mb-1">
                        Total Employees
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600">{profileInfo && profileInfo.totalNoOfEmp}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="linkedin" className="block font-semibold mb-1">
                    Sector
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600">{profileInfo && profileInfo.sector}</p>
                    </div>
                </div>
            </div>
            <Drawer open={open} onClose={closeDrawer} className="p-4" size={550}>
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">Edit Profile</Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <EmployerProfileForm onUpdateSuccess={closeDrawer} />
            </Drawer>
        </React.Fragment>
    );
};

export default EmployerProfileDisplay;
