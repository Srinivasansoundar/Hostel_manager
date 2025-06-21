import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../Components/AdminNavbar';

const ViewBlocks = () => {
  const { blockName } = useParams();
  const navigate = useNavigate();
  
  const [blockData, setBlockData] = useState({
    blockName: '',
    totalFloors: '',
    totalRooms: '',
    sharing: '',
    yearRestrictions: [],
    departmentRestrictions: [],
    sharedBlock: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/viewblock/${blockName}`)
      .then((response) => response.json())
      .then((data) => {
        setBlockData({
          blockName: data.blockName || '',
          totalFloors: data.totalFloors || '',
          totalRooms: data.totalRooms || '',
          sharing: data.sharing || '',
          yearRestrictions: data.yearRestrictions ? data.yearRestrictions.join(',') : '',
          departmentRestrictions: data.departmentRestrictions ? data.departmentRestrictions.join(',') : '',
          sharedBlock: data.sharedBlock || false,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching block data:', error);
        setIsLoading(false);
      });
  }, [blockName]);

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
    setIsLoading(true);

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
        navigate("/adminpage");
      })
      .catch((error) => {
        console.error('Error updating block data:', error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <AdminNavbar />
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-md shadow-sm p-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              Update Block Information
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Modify block settings and restrictions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-lg p-6 md:p-8">
            {/* Read-only Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Block Details (Read-only)
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="blockName" className="block text-sm font-medium text-gray-700 mb-2">
                    Block Name
                  </label>
                  <input
                    type="text"
                    id="blockName"
                    value={blockData.blockName}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="totalFloors" className="block text-sm font-medium text-gray-700 mb-2">
                    Total Floors
                  </label>
                  <input
                    type="text"
                    id="totalFloors"
                    value={blockData.totalFloors}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="totalRooms" className="block text-sm font-medium text-gray-700 mb-2">
                    Total Rooms
                  </label>
                  <input
                    type="text"
                    id="totalRooms"
                    value={blockData.totalRooms}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Editable Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Editable Settings
              </h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="sharing" className="block text-sm font-medium text-gray-700 mb-2">
                    Room Sharing
                  </label>
                  <input
                    type="number"
                    id="sharing"
                    name="sharing"
                    value={blockData.sharing}
                    onChange={handleChange}
                    min="1"
                    max="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of students per room"
                  />
                </div>

                <div>
                  <label htmlFor="yearRestrictions" className="block text-sm font-medium text-gray-700 mb-2">
                    Year Restrictions
                  </label>
                  <input
                    type="text"
                    id="yearRestrictions"
                    name="yearRestrictions"
                    value={blockData.yearRestrictions}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 1,2,3,4 (comma-separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter years separated by commas</p>
                </div>

                <div>
                  <label htmlFor="departmentRestrictions" className="block text-sm font-medium text-gray-700 mb-2">
                    Department Restrictions
                  </label>
                  <input
                    type="text"
                    id="departmentRestrictions"
                    name="departmentRestrictions"
                    value={blockData.departmentRestrictions}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., CSE,ECE,MECH (comma-separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter department codes separated by commas</p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sharedBlock"
                    name="sharedBlock"
                    checked={blockData.sharedBlock}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sharedBlock" className="ml-2 text-sm font-medium text-gray-700">
                    Enable as Shared Block
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/adminpage")}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Block
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewBlocks;