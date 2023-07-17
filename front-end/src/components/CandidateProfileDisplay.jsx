import React, { useEffect, useRef, useState } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CandidateProfileForm from '../components/CandidateProfileForm'
import { getProfile } from '../api/StudentApi';
import defaultProfile from '/Users/thewithcer/linkedin-project/front-end/src/assets/defaultProfile.png'
import { updatePhoto, getPhoto } from '../api/CommonApis';
import { LuUpload } from 'react-icons/Lu';



const CandidateProfileDisplay = () => {
    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [profileInfo, setProfileInfo] = useState();
    const [profilePic, setprofilePic] = useState();
    const [id, setid] = useState(null);
    const [displayMessage, setdisplayMessage] = useState('');

    useEffect(() => {
        const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
        getProfile(authToken)
            .then((profileData) => {
                setProfileInfo(profileData);
                setid(profileData._id)
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
         if(id){
            getPhoto(id, authToken)
            .then((resp) => {
                if (resp) {
                    setprofilePic(resp);
                }
            })
            .catch((error) => {
                console.error('Error uploading photo:', error);
            });
         }
    }, [open , id , displayMessage]);


    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const authToken = JSON.parse(localStorage.getItem('user')).accessToken;

        updatePhoto(formData, authToken)
            .then((resp) => {
                if (resp) {
                    setdisplayMessage('Photo uploaded successfully');
                } else {
                    setdisplayMessage('upload unsuccesfull')
                }
            })
            .catch((error) => {
                console.error('Error uploading photo:', error);
            });
    };
    return (
        <React.Fragment>
            <div className="max-w-lg mx-auto">
                <div className="flex flex-row items-center justify-center">
                    <img
                        src={profilePic && profilePic || defaultProfile}  
                        alt="Profile"
                        className={`w-40 h-40 rounded-full ${profilePic && profilePic ? 'object-cover' : ''} border-2`}
                    />
                    <div className="relative">
                        <input
                            type="file"
                            id="profilePicture"
                            ref={fileInputRef}
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={handleFileUpload}
                            className="sr-only"
                        />
                        <LuUpload
                            size={24}
                            className={"cursor-pointer w-8 h-8 rounded-lg p-1"}
                            onClick={() => fileInputRef.current.click()}
                        />
                    </div>
                </div>
                {displayMessage && <p className={`font-extrabold text-center ${displayMessage.includes('successfully')
                    ? 'text-green-500 font-extrabold'
                    : 'text-red-500 font-extrabold'}`}>{displayMessage}</p>}
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
