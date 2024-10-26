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
        <div className='max-w-lg mx-auto p-2  w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form action="" className='flex flex-col gap-4 '>
                {/* Username */}
                <div>
                    <Label htmlFor="username" value="Username" />
                    <TextInput
                        type="text"
                        id="username"
                        placeholder="username"
                        defaultValue={currentUser.rest.name}
                        readOnly
                        className="rounded-none"  // Remove border-radius using Tailwind's rounded-none class
                    />
                </div>
                {/* Roll Number */}
                <div>
                    <Label htmlFor="email" value="Roll Number" />
                    <TextInput
                        type="email"
                        id="email"
                        placeholder="rollNumber"
                        defaultValue={currentUser.rest.rollNumber}
                        className="!rounded-none "
                        readOnly
                    />
                </div>
                <div>
                    <Label htmlFor="contact" value="Contact" />
                    <TextInput
                        type="number"
                        id="contact"
                        placeholder="contact"
                        defaultValue={currentUser.rest.contact}
                        className="rounded-none"
                        readOnly
                    />
                </div>

                {/* Year */}
                <div>
                    <Label htmlFor="year" value="Year" />
                    <TextInput
                        type="text"
                        id="year"
                        placeholder="year"
                        defaultValue={currentUser.rest.year}
                        className="rounded-none"
                        readOnly
                    />
                </div>

                {/* Department */}
                <div>
                    <Label htmlFor="department" value="Department" />
                    <TextInput
                        type="text"
                        id="department"
                        placeholder="department"
                        defaultValue={currentUser.rest.department}
                        className="rounded-none"
                        readOnly
                    />
                </div>

                {/* <TextInput type='text' id='password' placeholder="password" /> */}

            </form>
            <Button className='mt-5' onClick={handleSignout} gradientDuoTone='purpleToBlue'>
                sign out
            </Button>
            {/* <div className="text-red-500 flex justify-center mt-5">
                <span className='cursor-pointer'>Sign Out</span>
            </div> */}
        </div>

    )
}

export default DashProfile