import React, { useEffect, useState } from 'react';

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('/api/complaint/get');
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Admin Complaints Dashboard</h1>
      <div className="grid grid-cols-2 gap-2">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white w-full shadow-md rounded-md p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{complaint.name}</h2>
            <div className='flex flex-col  '>
              <div className='flex gap-2 mb-2'>
                <h1 className='w-6/12 font-semibold'>Roll No:</h1>
                <p className="w-6/12 text-sm text-gray-600">{complaint.rollNo}</p>
              </div>
              <div className='flex gap-2 mb-2'>
                <h1 className='w-6/12 font-semibold'>Block:</h1>
                <p className=" w-6/12 text-sm text-left text-gray-600">{complaint.blockNo}, Floor: {complaint.floorNo}</p>
              </div>
              <div className='flex gap-2 mb-2'>
                <h1 className='w-6/12 font-semibold'>Room No:</h1>
                <p className="w-6/12 text-sm text-gray-600">{complaint.roomNo}</p>
              </div>
              <div className='flex gap-2 mb-2'>
                <h1 className='w-6/12 font-semibold'>Contact:</h1>
                <p className=" w-6/12 text-sm text-gray-600">{complaint.contactNo}</p>
              </div>
              <div className='flex gap-2 mb-2'>
                <h1 className='w-6/12 font-semibold'>Description:</h1>
                <p className="w-6/12 text-sm text-gray-600">{complaint.problemDescription}</p>
              </div>

              <p className="text-sm text-center p-2 font-medium">
                <span className={
                  `px-3 py-1 rounded-md 
                ${complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    complaint.status === 'onprogress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'}`
                }>
                  {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminComplaints;
