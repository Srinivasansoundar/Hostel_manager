import { TextInput, Button, Alert, Label } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
function DashProfile() {
    const { currentUser } = useSelector(state => state.user)

    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const handleSignout = async () => {
        try {
            const res = await fetch('/api/student/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className=' mx-auto p-2  w-full sm:w-[40%]  min-h-screen'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form action="" className='flex flex-col items-center gap-y-4 m-3  '>
                {/* Username */}
                {/* <input type="file" accept='image/*' /> */}
                <div className='w-full flex justify-center'>
                    <img src={currentUser.profileImage || '../public/user.png'} alt="profile image" className='w-36 h-36' />
                </div>
                <div className='flex flex-col gap-y-1 w-full'>
                    <label for="username" className='font-sans text-sm md:text-md lg:text-xl ' >Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="username"
                        defaultValue={currentUser.rest.name}
                        readOnly
                        className="rounded-md text-sm md:text-md "  // Remove border-radius using Tailwind's rounded-none class
                    />
                </div>
                {/* Roll Number */}
                <div className='flex flex-col gap-y-1 w-full'>
                    <label for="email" className='font-sans text-sm md:text-md lg:text-xl'>Roll Number</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="rollNumber"
                        defaultValue={currentUser.rest.rollNumber}
                        className="rounded-md text-sm md:text-md"
                        readOnly
                    />
                </div>
                <div className='flex flex-col gap-y-1 w-full '>
                    <label for="contact" className='font-sans text-sm md:text-md lg:text-xl'>Contact</label>
                    <input
                        type="number"
                        id="contact"
                        placeholder="contact"
                        defaultValue={currentUser.rest.contact}
                        className="rounded-md text-sm md:text-md  "
                        readOnly
                    />
                </div>

                {/* Year */}
                <div className='flex flex-col gap-y-1 w-full '>
                    <label for="year" className='font-sans text-sm md:text-md lg:text-xl'>Year</label>
                    <input
                        type="text"
                        id="year"
                        placeholder="year"
                        defaultValue={currentUser.rest.year}
                        className="rounded-md text-sm md:text-md  "
                        readOnly
                    />
                </div>

                {/* Department */}
                <div className='flex flex-col gap-y-1 w-full '>
                    <label for="department" className='font-sans text-sm md:text-md lg:text-xl'>Department</label>
                    <input
                        type="text"
                        id="department"
                        placeholder="department"
                        defaultValue={currentUser.rest.department}
                        className="rounded-md text-sm md:text-md "
                        readOnly
                    />
                </div>

                {/* <TextInput type='text' id='password' placeholder="password" /> */}

            </form>
            <div className='flex m-3 '>
                <button onClick={handleSignout} className='bg-red-500 py-2 px-4 mt-5 w-full rounded-md hover:bg-red-700 text-sm md:text-md'>
                    sign out
                </button>
            </div>
            {/* <div className="text-red-500 flex justify-center mt-5">
                <span className='cursor-pointer'>Sign Out</span>
            </div> */}
        </div>

    )
}

export default DashProfile