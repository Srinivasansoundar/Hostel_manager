import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Banner, Button, Navbar } from "flowbite-react";
import Detail from '../Components/Detail';
import AdminNavbar from '../Components/AdminNavbar';
import { useSelector } from 'react-redux';

function AdminPage() {
  const { blockData } = useSelector((state) => state.admin);

  return (
  
     
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
       <AdminNavbar/>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            Available Blocks
          </h1>
          <p className="text-gray-600 text-center mt-2">
            manage and view all accommodation blocks
          </p>
        </div>

        {/* Blocks Grid */}
        <div className="space-y-4">
          {blockData && blockData.length > 0 ? (
            blockData.map((block, index) => (
              <Detail key={index} name={block.blockName} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Blocks Available</h3>
              <p className="text-gray-500">Start by adding your first accommodation block.</p>
            </div>
          )}
        </div>

        
      </div>
    </div>

  );
}

export default AdminPage;