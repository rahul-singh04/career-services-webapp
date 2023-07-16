import React, { useEffect, useState } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CandidateProfileForm from '../components/CandidateProfileForm'
import { getProfile } from '../api/StudentApi';

const CandidateProfileDisplay = () => {
    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [profileInfo, setProfileInfo] = useState();

    useEffect(() => {
        const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
        getProfile(authToken)
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
                        Full Name
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600"> {profileInfo && profileInfo.fullName}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block font-semibold mb-1">
                        Location
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600">{profileInfo && profileInfo.location}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block font-semibold mb-1">
                        Phone Number
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600">{profileInfo && profileInfo.phoneNumber}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="linkedin" className="block font-semibold mb-1">
                        LinkedIn Profile
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600">{profileInfo && profileInfo.linkedInProfile}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="twitter" className="block font-semibold mb-1">
                        Twitter Profile
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600">{profileInfo && profileInfo.twitterProfile}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="github" className="block font-semibold mb-1">
                        GitHub Profile
                    </label>
                    <div className="bg-gray-100 my-2 p-2 w-full rounded-md">
                        <p className="text-base  text-gray-600">{profileInfo && profileInfo.githubProfile}</p>
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
                <CandidateProfileForm onUpdateSuccess={closeDrawer} />
            </Drawer>
        </React.Fragment>
    );
};

export default CandidateProfileDisplay;
