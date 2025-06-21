import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
function View_complaint() {
  const [complaints, setComplaints] = useState([]);
  const {currentUser}=useSelector(state=>state.user)
  // console.log(currentUser.rest)
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/complaint/delete/${currentUser.rest.rollNumber}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Handle successful response, maybe refresh data or show a success message
        setComplaints((prevComplaints) =>
          prevComplaints.filter((complaint) => complaint.rollNo !== currentUser.rest.rollNumber)
        );
        console.log('Complaint status updated successfully');
      } else {
        console.error('Failed to update complaint');
      }
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`/api/complaint/get/${currentUser.rest.rollNumber}`);
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
    <div className="p-6 font-sans w-8/12 translate-x-32 mx-auto min-h-screen">
    <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Complaints</h1>
    <div className="grid grid-cols-1 w-full gap-2">
      {complaints.map((complaint,index) => (
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

            <p className="text-sm flex justify-around text-center p-2 font-medium">
              <span className={
                `px-3 py-1 rounded-md 
              ${complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  complaint.status === 'onprogress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'}`
              }>
                {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
              </span>
              <span>
                   <button className='bg-green-400 p-2' onClick={handleUpdate}>Update status</button>
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default View_complaint