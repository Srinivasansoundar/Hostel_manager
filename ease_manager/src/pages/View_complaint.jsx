import React, { useState } from 'react';

function ViewComplaints({ complaints, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState({});

  const handleStatusUpdate = (id, status) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [id]: status,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-5xl p-6 overflow-x-auto whitespace-nowrap rounded-md shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4 text-center">View Complaints</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        
        {/* Horizontal scrolling section */}
        <div className="flex overflow-x-auto space-x-4 py-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="flex-shrink-0 bg-gray-100 p-4 w-72 border border-gray-300 rounded-md"
            >
              <h3 className="font-bold text-lg mb-2">Problem Description</h3>
              <p className="text-gray-700 mb-4">{complaint.problemDescription}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold">Status:</h4>
                <p
                  className={`inline-block px-3 py-1 mt-1 text-sm rounded-full ${
                    complaint.status === 'Submitted'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-blue-200 text-blue-800'
                  }`}
                >
                  {complaint.status}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-1">Update Status:</h4>
                <button
                  className={`px-3 py-1 mr-2 rounded-md ${
                    selectedStatus[complaint.id] === 'Completed'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleStatusUpdate(complaint.id, 'Completed')}
                >
                  Completed
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${
                    selectedStatus[complaint.id] === 'Not Completed'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleStatusUpdate(complaint.id, 'Not Completed')}
                >
                  Not Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const sampleComplaints = [
    { id: 1, problemDescription: 'Leaky faucet in room 101', status: 'Submitted' },
    { id: 2, problemDescription: 'No hot water in shower', status: 'In Progress' },
    { id: 3, problemDescription: 'Air conditioning not working', status: 'Submitted' },
    // Add more complaints as needed
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={() => setShowPopup(true)}
      >
        View Complaints
      </button>

      {showPopup && (
        <ViewComplaints
          complaints={sampleComplaints}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default App;
