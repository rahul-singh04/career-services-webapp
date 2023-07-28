import React from 'react';

const NotificationItem = ({ companyLocation, jobTitle, workLocation }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-1 mb-1 ">
            <div className="flex mb-2">
                <div className="">
                    <p className="text-sm  text-blue-500">{jobTitle}</p>
                    <p className="text-xs  ">companyNAme</p>
                </div>
            </div>
            <div className='flex justify-between'>
                <p className="text-xs text-gray-500">{workLocation}</p>
                <p className="text-xs text-gray-500 ">{companyLocation}</p>
            </div>
        </div>
    );
};

export default NotificationItem;
