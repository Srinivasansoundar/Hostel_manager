import React from 'react';
import { Banner, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { Link } from 'react-router-dom';

function Detail({ name }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 md:p-6 mt-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
        {/* Mobile Layout */}
        <div className="block md:hidden space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            {name}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <Link 
              to={`/allotedStudent/${name}`}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200 shadow-sm"
            >
              Alloted Students
            </Link>
            <Link 
              to={`/waitingstudent/${name}`}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200 shadow-sm"
            >
              Waiting Students
            </Link>
            <Link 
              to={`/viewblock/${name}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200 shadow-sm"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <div className="flex-1">
            <span className="text-lg font-semibold text-gray-800">
              {name}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              to={`/allotedStudent/${name}`}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Alloted Students
            </Link>
            <Link 
              to={`/waitingstudent/${name}`}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Waiting Students
            </Link>
            <Link 
              to={`/viewblock/${name}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;