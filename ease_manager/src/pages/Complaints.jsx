import React, { useState } from 'react';

function Complaints() {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    blockNo: '',
    floorNo: '',
    roomNo: '',
    contactNo: '',
    problemDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Complaints Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Roll No</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          
          {/* Three fields in one row */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-bold">Block No</label>
              <input
                type="text"
                name="blockNo"
                value={formData.blockNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Floor No</label>
              <input
                type="text"
                name="floorNo"
                value={formData.floorNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Room No</label>
              <input
                type="text"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold">Problem Description</label>
            <textarea
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleChange}
              maxLength="500"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
