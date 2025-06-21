import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
function Complaints() {
  const {currentUser}=useSelector(state=>state.user)
  const {rest}=currentUser
//   console.log(currentUser)
    const [detail,setDetail]=useState({
        name:'',
        rollno:'',
        block:'',
        floor:'',
        roomno:'',
        contact:''
    })
 useEffect(()=>{
    const fetchStudent=async()=>{
        try{
            const response=await fetch(`/api/student/${rest.rollNumber}`);
            if(!response.ok){
                throw new Error('Failed to fetch student details');
            }
            const data=await response.json();   
            console.log(data)
            setDetail({
                name:data.name,
                rollno:data.rollNumber,
                block:data.block,
                floor:data.floor,
                roomno:data.roomNumber,
                contact:data.contact

            })
            
        }
        catch(err){
            console.error('Error fetching waiting list:',err)
        }
    };
    fetchStudent();
 },[rest.rollNumber])
//  console.log(detail)
//  useEffect(() => {
//     // console.log("Updated detail:", detail);
// }, [detail]);
const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    blockNo: "",
    floorNo: "",
    roomNo: "",
    contactNo: "",
    problemDescription: ""
  });
  
  // Initialize formData based on detail whenever detail changes
  useEffect(() => {
    setFormData({
      name: detail?.name || "",
      rollNo: detail?.rollno || "",
      blockNo: detail?.block || "",
      floorNo: detail?.floor || "",
      roomNo: detail?.roomno || "",
      contactNo: detail?.contact || "",
      problemDescription: ""
    });
  }, [detail]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Send form data to the backend
        const response = await fetch('/api/complaint/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                status: "pending" // Initial status can be set as pending
            })
        });

        if (!response.ok) {
            throw new Error("Failed to submit complaint");
        }

        const result = await response.json();
        console.log('Form submitted successfully:', result);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};


  return (
    <div className="flex items-center translate-x-full justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Complaints Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={detail.name}
            //   onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Roll No</label>
            <input
              type="text"
              name="rollNo"
              value={detail.rollno}
            //   onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
              required
              readOnly
            />
          </div>
          
          {/* Three fields in one row */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-bold">Block No</label>
              <input
                type="text"
                name="blockNo"
                value={detail.block}
                // onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Floor No</label>
              <input
                type="text"
                name="floorNo"
                value={detail.floor}
                // onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Room No</label>
              <input
                type="text"
                name="roomNo"
                value={detail.roomno}
                // onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
                required
                readOnly
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={detail.contact}
            //   onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
              required
              readOnly
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold">Problem Description</label>
            <textarea
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleChange}
              maxLength="500"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
              rows="4"
              placeholder="Describe your problem here (max 500 words)"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-900 text-white py-1 px-5 border-none cursor-pointer text-lg transition-colors duration-300 hover:bg-blue-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Complaints;
