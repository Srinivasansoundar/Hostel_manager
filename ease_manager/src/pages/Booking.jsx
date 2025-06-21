import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import '../styles/book.css';
import { updateAvailableBlocks } from '../redux/user/userSlice';
import { useDispatch } from "react-redux";
import { TextInput, Label, Button } from 'flowbite-react';
const BookingForm = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [roommateRollNumbers, setRoommateRollNumbers] = useState(['']);
    const [roommatesData, setRoommatesData] = useState([]);
    const [studentLoading, setStudentLoading] = useState(false);
    const [roommateLoading, setRoommateLoading] = useState([]);
    const[flag,setFlag]=useState(false)
    const [error, setError] = useState('');
    const location = useLocation();
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const { floorData, blockData } = location.state;
    const { floorNumber } = floorData
    const { blockName, sharing } = blockData
    let [count, setCount] = useState(1);
    console.log(currentUser)
    const navigate = useNavigate()
    //   console.log(floorNumber)
    //   console.log(blockName)
    // console.log()
    const handleRollNumberChange = (e) => {
        setRollNumber(e.target.value);
    };
    const handleUpdateAvailableBlocks = (updatedBlocks) => {
        // Dispatch the action to update just the available blocks
        dispatch(updateAvailableBlocks(updatedBlocks));
    };

    const handleRetrieveStudent = async (index) => {
        setStudentLoading(true);
        setError('');
        // if(rollNumber===''){
        //     setRollNumber(currentUser.rest.rollNumber)
        // }
        // console.log(rollNumber)
        setFlag(true)
        try {
            const response = await fetch(`/api/student/${currentUser.rest.rollNumber}`);
            if (!response.ok) {
                throw new Error('Student not found or an error occurred');
            }
            const data = await response.json();
            if (data.block) {
                alert(`Roommate with this roll number is already allocated to block: ${data.block}.`);
                setStudentLoading(false);
                return
            }
            setStudentData(data);

            // Add the main student to the roommates array as the first roommate
            setRoommateRollNumbers((prev) => {
                // Ensure the roll number isn't added multiple times if retrieved again
                if (!prev.includes(rollNumber)) {
                    return [rollNumber, ...prev];
                }
                return prev;
            });

            setRoommatesData((prevRoommatesData) => {
                // Ensure the main student's data isn't added multiple times if retrieved again
                if (prevRoommatesData.length === 0 || prevRoommatesData[0]?.rollNumber !== rollNumber) {
                    return [data, ...prevRoommatesData];
                }
                return prevRoommatesData;
            });
        } catch (err) {
            setError(err.message);
        }

        setStudentLoading(false);
    };

    const handleRoommateRollNumberChange = (index, value) => {
        const updatedRoommateRollNumbers = [...roommateRollNumbers];
        updatedRoommateRollNumbers[index] = value;
        setRoommateRollNumbers(updatedRoommateRollNumbers);
    };

    const handleRetrieveRoommate = async (index) => {
        const newRoommateLoading = [...roommateLoading];
        newRoommateLoading[index] = true;
        setRoommateLoading(newRoommateLoading);

        setError('');

        try {
            const response = await fetch(`/api/student/${roommateRollNumbers[index]}`);
            if (!response.ok) {
                throw new Error(`Roommate with roll number ${roommateRollNumbers[index]} not found`);
            }

            const data = await response.json();
            console.log(currentUser.availableBlocks)
            if (data.block) {
                alert(`Roommate with roll number ${roommateRollNumbers[index]} is already allocated to block: ${data.block}.`);
            }
            else if (currentUser.availableBlocks.some(block =>
                block.yearRestrictions &&
                block.yearRestrictions.length !== 0 &&  // Check if yearRestrictions is not empty
                !block.yearRestrictions.includes(data.year)  // Check if year is not included
            )) {
                alert(`This student with ${roommateRollNumbers[index]} is not allocated to this block`);
            }
            else {
                setRoommatesData((prevRoommatesData) => {
                    const updatedRoommatesData = [...prevRoommatesData];
                    updatedRoommatesData[index] = data;
                    return updatedRoommatesData;
                });
            }
        } catch (err) {
            setError(err.message);
        }

        newRoommateLoading[index] = false;
        setRoommateLoading(newRoommateLoading);
    };

    const handleAddRoommate = () => {
        if (count + 1 > sharing) {
            setError("Exceeds the capacity")
            return
        }
        setCount(count + 1)
        console.log(count)
        setRoommateRollNumbers([...roommateRollNumbers, '']);
        setRoommatesData([...roommatesData, null]);
    };

    const handleFormSubmit = async () => {
        // console.log('Form submitted:',  roommatesData);
        if (count != sharing) {
            setError("Vacant Space available")
            return
        }
        const requestData = {
            roommatesData, // or bookings if that's what you intended
            blockData,
            floorData,
        };
        try {
            const res = await fetch('/api/student/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
            const data = await res.json();
            // console.log(data)
            if (data.success == false) {
                // Use setError to store the error in the component state
                setError(data.message);
                return; // Stop further execution
            }
            if (res.ok) {
                // ------------------
                const availableBlocks = currentUser.availableBlocks;

                // Update the block by blockName
                const updatedBlocks = availableBlocks.map(block => {
                    if (block.blockName === data.blockName) {
                        return {
                            ...block, // Copy existing properties
                            totalVacantRooms: block.totalVacantRooms - 1 // Update specific field
                        };
                    }
                    return block; // Keep other blocks unchanged
                });

                // Update the floor within the updatedBlocks for the relevant block
                const updatedFloors = updatedBlocks.map(block => {
                    if (block.blockName === data.blockName) {
                        return {
                            ...block,
                            floors: block.floors.map(floor => {
                                if (floor.floorNumber === data.floorNumber) {
                                    return {
                                        ...floor,
                                        availableRooms: data.availableRooms
                                    };
                                }
                                return floor; // Keep other floors unchanged
                            })
                        };
                    }
                    return block; // Keep other blocks unchanged
                });

                // Dispatch the updated availableBlocks
                dispatch(updateAvailableBlocks(updatedFloors));

                // Navigate to the dashboard
                navigate('/dashboard?tab=dashboard');
            }
        } catch (err) {
            // Set error in case of exception
            setError(err.message);
        }

    };

    return (
        <div className='min-h-screen  bg-gradient-to-b from-[#0b536f] to-[#3ea9a3] flex justify-center items-center '>
            <div className='w-3/4 min-h-[700px] h-auto mt-32 bg-white'>
                <div className='h-80  bg-gradient-to-r from-[#3ea9a3] to-[#0b536f]'>
                    <div className='pt-9'>
                        <h1 className='font-poppins tracking-wide text-yellow-200 font-bold drop-shadow-md text-4xl text-center'>Room Booking Form</h1>
                        <h3 className='text-white font-semibold text-xl mt-3 text-center'>Block Name-<span className='text-yellow-200 font-semibold'>{blockName}</span> , Floor Number-<span className='text-yellow-200 font-semibold'>{floorNumber}</span></h3>
                    </div>
                </div>
                <div></div>
                <div className='transform -translate-y-40 z-10 h-auto w-3/4 mx-auto bg-white  shadow-md'>
                    <div className="flex flex-col gap-3 w-[90%] mx-auto p-4">
                        <div>
                            <Label htmlFor="rollNumber" className="block text-[16px] font-bold text-gray-700 mb-1">
                                Roll Number:
                            </Label>
                            <input
                                type="text"
                                id="rollNumber"
                                value={currentUser.rest.rollNumber}
                                placeholder="Enter Your Roll Number"
                                readOnly
                                className="w-full focus:ring-2 focus:ring-blue-400 rounded-md border-1"
                            />
                        </div>

                        <Button
                            onClick={handleRetrieveStudent}
                            disabled={studentLoading}
                            className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 rounded-md"
                        >
                            {studentLoading ? 'Loading...' : 'Retrieve Student'}
                        </Button>
                    </div>
                    {studentData && (
                        <div className="w-[90%] mx-auto p-4 border-1 rounded-sm bg-white">
                            <div className="flex justify-between items-center mb-2">
                                <label className='flex-auto w-[35%]'>Name :</label>
                                <input type="text" value={studentData.name} readOnly className='w-[65%] flex-auto rounded-md' />
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <label className='flex-auto w-[35%]'>Department :</label>
                                <input type="text" value={studentData.department} readOnly className='w-[65%] flex-auto rounded-md' />
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <label className='flex-auto w-[35%]'>Roll Number :</label>
                                <input type="text" value={studentData.rollNumber} readOnly className='w-[65%] flex-auto rounded-md' />
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <label className='flex-auto w-[35%]'>Year of Study :</label>
                                <input type="text" value={studentData.year} readOnly className='w-[65%] flex-auto rounded-md' />
                            </div>
                        </div>
                    )}
                    <h3 className='text-[16px] font-bold text-center'>Roommates</h3>
                    {roommateRollNumbers.map((rollNum, index) => (
                        <div key={`roommate-${index}`} className="w-[90%] mx-auto p-4 text-[16px] border-1 rounded-sm bg-white">
                            <div className="flex flex-col mb-4">
                                <label className='mb-2 font-bold'>Roommate {index + 1} Roll Number:</label>
                                {
                                    index === 0 ?
                                        <>
                                            <input
                                                type="text"
                                                value={currentUser.rest.rollNumber}
                                                onChange={(e) => handleRoommateRollNumberChange(index, e.target.value)}
                                                placeholder="Enter Roommate Roll Number"
                                                className='rounded-md'
                                                readOnly
                                            />

                                        </> :
                                        <>
                                            <input
                                                type="text"
                                                value={rollNum}
                                                onChange={(e) => handleRoommateRollNumberChange(index, e.target.value)}
                                                placeholder="Enter Roommate Roll Number"
                                                className='rounded-md'
                                            />
                                            <Button className='rounded-md my-2 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400' onClick={() => handleRetrieveRoommate(index)} disabled={roommateLoading[index]}>
                                                {roommateLoading[index] ? 'Loading...' : 'Retrieve Roommate'}
                                            </Button>
                                        </>
                                }

                            </div>

                            {roommatesData[index] && (
                                <div className="mx-auto brder-1 rounded-sm bg-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className='flex-auto w-[35%]'>Name :</label>
                                        <input type="text" value={roommatesData[index].name} readOnly className='w-[65%] flex-auto rounded-md' />
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className='flex-auto w-[35%]'>Department :</label>
                                        <input type="text" value={roommatesData[index].department} readOnly className='w-[65%] flex-auto rounded-md' />
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className='flex-auto w-[35%]'>Roll Number :</label>
                                        <input type="text" value={roommatesData[index].rollNumber} readOnly className='w-[65%] flex-auto rounded-md' />
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className='flex-auto w-[35%]'>Year of Study :</label>
                                        <input type="text" value={roommatesData[index].year} readOnly className='w-[65%] flex-auto rounded-md' />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {error && <p className="text-red-500 font-bold text-center mb-2">{error}</p>}
                    <div className='flex justify-center mb-2'>
                    {flag?
                    <Button className='mb-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800 rounded-md' onClick={handleAddRoommate}>
                        Add Roommate
                    </Button>:''}
                    </div>
                    {studentData && (
                        <div className='flex justify-center'>
                        <Button className="mb-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 rounded-md" onClick={handleFormSubmit} >
                            Submit Booking
                        </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default BookingForm;
// <div className="booking-form-container">
//     <h2 className='font-bold'>ROOM BOOKING FORM</h2>
//     <h3 className='font-bold'>BLOCK NAME-{blockName}</h3>
//     <h3 className='font-bold'>FLOOR NUMBER-{floorNumber}</h3>
//     <div className="input-group">
//         <label htmlFor="rollNumber">Roll Number:</label>
//         <input
//             type="text"
//             id="rollNumber"
//             value={currentUser.rest.rollNumber}
//             // onChange={handleRollNumberChange}
//             placeholder="Enter Your Roll Number"
//             readOnly
//         />
//         <button onClick={handleRetrieveStudent} disabled={studentLoading}>
//             {studentLoading ? 'Loading...' : 'Retrieve Student'}
//         </button>
//     </div>



//     {studentData && (
//         <div className="student-details">
//             <div className="form-field">
//                 <label>Name:</label>
//                 <input type="text" value={studentData.name} readOnly />
//             </div>
//             <div className="form-field">
//                 <label>Department:</label>
//                 <input type="text" value={studentData.department} readOnly />
//             </div>
//             <div className="form-field">
//                 <label>Roll Number:</label>
//                 <input type="text" value={studentData.rollNumber} readOnly />
//             </div>
//             <div className="form-field">
//                 <label>Year of Study:</label>
//                 <input type="text" value={studentData.year} readOnly />
//             </div>
//         </div>
//     )}

//     <h3>Roommates</h3>
//     {roommateRollNumbers.map((rollNum, index) => (
//         <div key={`roommate-${index}`} className="roommate-group">
//             <div className="input-group">
//                 <label>Roommate {index + 1} Roll Number:</label>
//                 {
//                     index === 0 ?
//                         <>
//                             <input
//                                 type="text"
//                                 value={currentUser.rest.rollNumber}
//                                 onChange={(e) => handleRoommateRollNumberChange(index, e.target.value)}
//                                 placeholder="Enter Roommate Roll Number"
//                                 readOnly
//                             />
//                             <button onClick={() => handleRetrieveRoommate(index)} disabled={roommateLoading[index]}>
//                                 {roommateLoading[index] ? 'Loading...' : 'Retrieve Roommate'}
//                             </button>
//                         </> :
//                         <>
//                             <input
//                                 type="text"
//                                 value={rollNum}
//                                 onChange={(e) => handleRoommateRollNumberChange(index, e.target.value)}
//                                 placeholder="Enter Roommate Roll Number"
//                             />
//                             <button onClick={() => handleRetrieveRoommate(index)} disabled={roommateLoading[index]}>
//                                 {roommateLoading[index] ? 'Loading...' : 'Retrieve Roommate'}
//                             </button>
//                         </>
//                 }

//             </div>

//             {roommatesData[index] && (
//                 <div className="student-details">
//                     <div className="form-field">
//                         <label>Name:</label>
//                         <input type="text" value={roommatesData[index].name} readOnly />
//                     </div>
//                     <div className="form-field">
//                         <label>Department:</label>
//                         <input type="text" value={roommatesData[index].department} readOnly />
//                     </div>
//                     <div className="form-field">
//                         <label>Roll Number:</label>
//                         <input type="text" value={roommatesData[index].rollNumber} readOnly />
//                     </div>
//                     <div className="form-field">
//                         <label>Year of Study:</label>
//                         <input type="text" value={roommatesData[index].year} readOnly />
//                     </div>
//                 </div>
//             )}
//         </div>
//     ))}
//     {error && <p className="error-message">{error}</p>}
//     <button onClick={handleAddRoommate}>Add Roommate</button>

//     {studentData && (
//         <button onClick={handleFormSubmit} className="submit-button">
//             Submit Booking
//         </button>
//     )}
// </div>