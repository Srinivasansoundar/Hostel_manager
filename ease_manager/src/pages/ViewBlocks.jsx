import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
const ViewBlocks = () => {
  const {blockName}=useParams()
  
//   console.log(blockName)
const navigate=useNavigate()
  const [blockData, setBlockData] = useState({
    blockName: '',
    totalFloors: '',
    totalRooms: '',
    sharing: '',
    yearRestrictions: [],
    departmentRestrictions: [],
    sharedBlock: false,
  });

  useEffect(() => {
    // Fetch block data from backend (replace with correct block ID or route)
    fetch(`/api/admin/viewblock/${blockName}`)
      .then((response) => response.json())
      .then((data) =>{
        setBlockData({
            blockName: data.blockName || '',
            totalFloors: data.totalFloors || '',
            totalRooms: data.totalRooms || '',
            sharing: data.sharing || '',
            yearRestrictions: data.yearRestrictions ? data.yearRestrictions.join(',') : '',
            departmentRestrictions: data.departmentRestrictions ? data.departmentRestrictions.join(',') : '',
            sharedBlock: data.sharedBlock || false,
          });
      })
      .catch((error) => console.error('Error fetching block data:', error));
  }, []);
  console.log(blockData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlockData({
      ...blockData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setBlockData({
      ...blockData,
      sharedBlock: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update block data on backend using fetch
    fetch(`/api/admin/editblock/${blockName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blockData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update block');
        }
        return response.json();
      })
      .then((data) => {
        alert('Block updated successfully');
        navigate("/adminpage")
      })
      .catch((error) => console.error('Error updating block data:', error));
  };
//   console.log(blockData.departmentRestrictions)
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Update Block Information</h2>
      
      {/* Read-only fields */}
      <div className="mb-4">
        <label htmlFor="blockName" className="block text-gray-700 font-bold">Block Name:</label>
        <input type="text" id="blockName" value={blockData.blockName} readOnly className="w-full p-2 mt-1 border  bg-gray-100" />
      </div>
      
      <div className="mb-4">
        <label htmlFor="totalFloors" className="block text-gray-700 font-bold">Total Floors:</label>
        <input type="text" id="totalFloors" value={blockData.totalFloors} readOnly className="w-full p-2 mt-1 border  bg-gray-100" />
      </div>
      
      <div className="mb-4">
        <label htmlFor="totalRooms" className="block text-gray-700 font-bold">Total Rooms:</label>
        <input type="text" id="totalRooms" value={blockData.totalRooms} readOnly className="w-full p-2 mt-1 border  bg-gray-100" />
      </div>

      {/* Editable fields */}
      <div className="mb-4">
        <label htmlFor="sharing" className="block text-gray-700 font-bold">Sharing:</label>
        <input type="number" id="sharing" name="sharing" value={blockData.sharing} onChange={handleChange} className="w-full p-2 mt-1 border " />
      </div>
      
      <div className="mb-4">
        <label htmlFor="yearRestrictions" className="block text-gray-700 font-bold">Year Restrictions (comma-separated):</label>
        <input type="text" id="yearRestrictions" name="yearRestrictions" value={blockData.yearRestrictions} onChange={handleChange} className="w-full p-2 mt-1 border" />
      </div>
      
      <div className="mb-4">
        <label htmlFor="departmentRestrictions" className="block text-gray-700 font-bold">Department Restrictions (comma-separated):</label>
        <input type="text" id="departmentRestrictions" name="departmentRestrictions" value={blockData.departmentRestrictions} onChange={handleChange} className="w-full p-2 mt-1 border " />
      </div>
      
      <div className="mb-4">
        <label htmlFor="sharedBlock" className="block text-gray-700 font-bold">Shared Block:</label>
        <input type="checkbox" id="sharedBlock" name="sharedBlock" checked={blockData.sharedBlock} onChange={handleCheckboxChange} className="mt-1" />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update Block</button>
    </form>
  );
};

export default ViewBlocks;
