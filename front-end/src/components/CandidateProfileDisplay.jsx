import React, { useEffect, useRef, useState } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { TagsInput } from "react-tag-input-component";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CandidateProfileForm from '../components/CandidateProfileForm';
import { getProfile } from '../api/StudentApi';
import defaultProfile from '../assets/defaultProfile.png';
import { updatePhoto, getPhoto } from '../api/CommonApis';
import { LuUpload } from 'react-icons/lu';
import { updateResume, getResume } from '../api/StudentApi'



const CandidateProfileDisplay = () => {
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [profileInfo, setProfileInfo] = useState();
    const [profilePic, setprofilePic] = useState();
    const [id, setid] = useState(null);
    const [displayMessage, setdisplayMessage] = useState('');
    const [resume, setresume] = useState(null);


    useEffect(() => {
        const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
        getProfile(authToken)
            .then((profileData) => {
                console.log(profileData);
                setProfileInfo(profileData);
                setid(profileData._id);
                getPhoto(profileData._id, authToken)
                    .then((resp) => {
                        if (resp) {
                            setprofilePic(resp);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching photo:', error);
                    });
                // getResume(profileData._id, authToken)
                //     .then((resp) => {
                //         if (resp) {
                //             setresume(resp);
                //             const fileURL = URL.createObjectURL(resp);
                //             window.open(fileURL, '_blank');
                //         }
                //     })
                //     .catch((error) => {
                //         console.error('Error fetching photo:', error);
                //     });

            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });


    }, [open]);

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
                    setdisplayMessage('Upload unsuccessful');
                }
            })
            .catch((error) => {
                console.error('Error uploading photo:', error);
            });
    };

    const handleResumeUpload = (e) => {
        const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        updateResume(formData, authToken)
            .then((resp) => {
                if (resp) {
                    setdisplayMessage('Resume uploaded successfully');
                } else {
                    setdisplayMessage('Resume unsuccessful');
                }
            })
            .catch((error) => {
                console.error('Error uploading photo:', error);
            });
    };

    const handleResumeDownload = () => {
        const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
        getResume(profileInfo._id, authToken)
            .then((resp) => {
                if (resp) {
                    setresume(resp);
                    const fileURL = URL.createObjectURL(resp);
                    window.open(fileURL, '_blank');
                }
            })
            .catch((error) => {
                console.error('Error fetching resume:', error);
            });
    };

    return (
        <React.Fragment>
            <div className="flex flex-col gap-4 mx-auto">
                <div className="flex flex-row items-center justify-center">
                    <img
                        src={profilePic || defaultProfile}
                        alt="Profile"
                        className={`w-40 h-40 rounded-full ${profilePic ? 'object-cover' : ''} border-2`}
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
                            className="cursor-pointer w-8 h-8 rounded-lg p-1"
                            onClick={() => fileInputRef.current.click()}
                        />
                    </div>
                </div>
                {displayMessage && (
                    <p className={`font-extrabold text-center ${displayMessage.includes('successfully')
                        ? 'text-green-500 font-extrabold'
                        : 'text-red-500 font-extrabold'}`}>{displayMessage}</p>
                )}
                <div className="flex justify-around mb-4">
                    <label htmlFor="resume-upload" className="flex items-center cursor-pointer mx-2">
                        <input
                            type="file"
                            id="resume-upload"
                            ref={fileInputRef}
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleResumeUpload}
                        />
                        <div className='flex gap-4'>
                            <Button size="sm" onClick={() => fileInputRef.current.click()}>
                                Upload Resume
                            </Button>
                            {profileInfo && profileInfo.resumeUploaded && <Button size="sm" color="green" onClick={() => handleResumeDownload()}>
                                Download Resume
                            </Button>}
                            <Button size="sm" color="orange">
                                Build resume
                            </Button>
                            <Button size="sm" onClick={openDrawer}>Edit</Button>
                        </div>
                    </label>
                </div>
                <div className='flex flex-col'>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block font-semibold mb-1">
                            Full Name
                        </label>
                        <div className="bg-gray-100 my-1 p-2 w-full rounded-md">
                            <p className="text-base text-gray-600">{profileInfo && profileInfo.fullName}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block font-semibold mb-1">
                            Location
                        </label>
                        <div className="bg-gray-100 my-1 p-2 w-full rounded-md">
                            <p className="text-base text-gray-600">{profileInfo && profileInfo.location}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block font-semibold mb-1">
                            Phone Number
                        </label>
                        <div className="bg-gray-100 my-1 p-2 w-full rounded-md">
                            <p className="text-base text-gray-600">{profileInfo && profileInfo.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="linkedin" className="block font-semibold mb-1">
                            LinkedIn Profile
                        </label>
                        <div className="bg-gray-100 my-1 p-2 w-full rounded-md">
                            <p className="text-base text-gray-600">{profileInfo && profileInfo.linkedInProfile}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="twitter" className="block font-semibold mb-1">
                            Twitter Profile
                        </label>
                        <div className="bg-gray-100 my-1 p-2 w-full rounded-md">
                            <p className="text-base text-gray-600">{profileInfo && profileInfo.twitterProfile}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="github" className="block font-semibold mb-1">
                            GitHub Profile
                        </label>
                        <div className="bg-gray-100 my-1 p-2 w-full rounded-md">
                            <p className="text-base text-gray-600">{profileInfo && profileInfo.githubProfile}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="github" className="block font-semibold mb-1">
                            Skills
                        </label>
                        <div className="bg-gray-100 my-1 p-2 w-full rounded-md">
                            {profileInfo && profileInfo.skills &&
                                <div className=' flex flex-wrap justify-between'>
                                    {profileInfo.skills.map((skill, index) =>
                                    (
                                        <p className="text-base text-gray-600 p-2 border rounded" key={index}>{skill}</p>
                                    ))
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="experiences" className="block font-semibold mb-1">
                            Experience
                        </label>
                        <div className="bg-gray-100 my-1 p-2 w-full rounded-md">
                            {profileInfo && profileInfo.professionalSummary && profileInfo.professionalSummary.length > 0 &&
                                <div className=''>
                                    {profileInfo.professionalSummary.map((summary, index) =>
                                    (
                                        <div key={index}>
                                            <p className="text-base text-gray-600 p-2 border rounded">{summary.companyName}</p>
                                            <p className="text-base text-gray-600 p-2 border rounded">Title: {summary.title}</p>
                                            <p className="text-base text-gray-600 p-2 border rounded">Start: {new Date(summary.startDate).toISOString().split('T')[0]}</p>
                                            <p className="text-base text-gray-600 p-2 border rounded">End: {new Date(summary.endDate).toISOString().split('T')[0]}</p>
                                        </div>
                                    ))
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Drawer open={open} onClose={closeDrawer} className="p-4 overflow-y-auto" size={550}>
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
