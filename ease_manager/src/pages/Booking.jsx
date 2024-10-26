import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/book.css';
import { updateAvailableBlocks } from '../redux/user/userSlice';
import { useDispatch } from "react-redux";
const BookingForm = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [roommateRollNumbers, setRoommateRollNumbers] = useState(['']);
    const [roommatesData, setRoommatesData] = useState([]);
    const [studentLoading, setStudentLoading] = useState(false);
    const [roommateLoading, setRoommateLoading] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation();
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const { floorData, blockData } = location.state;
    const { floorNumber } = floorData
    const { blockName, sharing } = blockData
    let [count,setCount]=useState(1);
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
        if(count +1>sharing){
            setError("Exceeds the capacity")
            return
        }
        setCount(count+1)
        console.log(count)
        setRoommateRollNumbers([...roommateRollNumbers, '']);
        setRoommatesData([...roommatesData, null]);
    };

    const handleFormSubmit = async () => {
        // console.log('Form submitted:',  roommatesData);
        if(count!=sharing){
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
        <div className="booking-form-container">
            <h2 className='font-bold'>ROOM BOOKING FORM</h2>
            <h3 className='font-bold'>BLOCK NAME-{blockName}</h3>
            <h3 className='font-bold'>FLOOR NUMBER-{floorNumber}</h3>
            <div className="input-group">
                <label htmlFor="rollNumber">Roll Number:</label>
                <input
                    type="text"
                    id="rollNumber"
                    value={currentUser.rest.rollNumber}
                    // onChange={handleRollNumberChange}
                    placeholder="Enter Your Roll Number"
                    readOnly
                />
                <button onClick={handleRetrieveStudent} disabled={studentLoading}>
                    {studentLoading ? 'Loading...' : 'Retrieve Student'}
                </button>
            </div>



            {studentData && (
                <div className="student-details">
                    <div className="form-field">
                        <label>Name:</label>
                        <input type="text" value={studentData.name} readOnly />
                    </div>
                    <div className="form-field">
                        <label>Department:</label>
                        <input type="text" value={studentData.department} readOnly />
                    </div>
                    <div className="form-field">
                        <label>Roll Number:</label>
                        <input type="text" value={studentData.rollNumber} readOnly />
                    </div>
                    <div className="form-field">
                        <label>Year of Study:</label>
                        <input type="text" value={studentData.year} readOnly />
                    </div>
                </div>
            )}

            <h3>Roommates</h3>
            {roommateRollNumbers.map((rollNum, index) => (
                <div key={`roommate-${index}`} className="roommate-group">
                    <div className="input-group">
                        <label>Roommate {index + 1} Roll Number:</label>
                        {
                            index === 0 ?
                                <>
                                    <input
                                        type="text"
                                        value={currentUser.rest.rollNumber}
                                        onChange={(e) => handleRoommateRollNumberChange(index, e.target.value)}
                                        placeholder="Enter Roommate Roll Number"
                                        readOnly
                                    />
                                    <button onClick={() => handleRetrieveRoommate(index)} disabled={roommateLoading[index]}>
                                        {roommateLoading[index] ? 'Loading...' : 'Retrieve Roommate'}
                                    </button>
                                </> :
                                <>
                                    <input
                                        type="text"
                                        value={rollNum}
                                        onChange={(e) => handleRoommateRollNumberChange(index, e.target.value)}
                                        placeholder="Enter Roommate Roll Number"
                                    />
                                    <button onClick={() => handleRetrieveRoommate(index)} disabled={roommateLoading[index]}>
                                        {roommateLoading[index] ? 'Loading...' : 'Retrieve Roommate'}
                                    </button>
                                </>
                        }

                    </div>

                    {roommatesData[index] && (
                        <div className="student-details">
                            <div className="form-field">
                                <label>Name:</label>
                                <input type="text" value={roommatesData[index].name} readOnly />
                            </div>
                            <div className="form-field">
                                <label>Department:</label>
                                <input type="text" value={roommatesData[index].department} readOnly />
                            </div>
                            <div className="form-field">
                                <label>Roll Number:</label>
                                <input type="text" value={roommatesData[index].rollNumber} readOnly />
                            </div>
                            <div className="form-field">
                                <label>Year of Study:</label>
                                <input type="text" value={roommatesData[index].year} readOnly />
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleAddRoommate}>Add Roommate</button>

            {studentData && (
                <button onClick={handleFormSubmit} className="submit-button">
                    Submit Booking
                </button>
            )}
        </div>
    );
};

export default BookingForm;
