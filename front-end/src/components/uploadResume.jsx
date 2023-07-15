import React from 'react'

export const uploadResume = () => {
    return (
        <div>
            <label htmlFor="resume-upload" className=" flex bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                <MdOutlineUploadFile size={40} onClick={handleResumeUpload} />
                <p className='pt-2'>Upload Resume</p>
            </label>
        </div>
    )
}
