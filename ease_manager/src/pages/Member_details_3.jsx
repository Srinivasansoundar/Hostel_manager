import React from 'react';

const Member_details_3 = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto border-t-4 border-blue-500">
      <form>
        {/* Person1 Details */}
        <div className="border-b-2 pb-6">
          <h2 className="text-xl font-bold mb-4">Person1 Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Name:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Roll No:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">E-mail:</label>
              <input type="email" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Department:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
          </div>
        </div>

        {/* Person2 Details */}
        <div className="border-b-2 pb-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Person2 Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Name:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Roll No:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">E-mail:</label>
              <input type="email" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Department:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
          </div>
        </div>

        {/* Person3 Details */}
        <div className="border-b-2 pb-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Person3 Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Name:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Roll No:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">E-mail:</label>
              <input type="email" className="w-3/4 px-4 py-2 border rounded" />
            </div>
            <div className="flex items-center">
              <label className="block font-semibold w-1/4 font-medium">Department:</label>
              <input type="text" className="w-3/4 px-4 py-2 border rounded" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Member_details_3;
