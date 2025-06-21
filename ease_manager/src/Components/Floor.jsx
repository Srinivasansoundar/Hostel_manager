import React, { } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react'
import { useSelector } from 'react-redux';
function Floor({ fl, blo }) {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleClick = async () => {
    // Check if the user has an allocated block
    const response = await fetch(`/api/student/${currentUser.rest.rollNumber}`);
    if (!response.ok) {
      throw new Error('Student not found or an error occurred');
    }
    const data = await response.json();
    console.log(currentUser.rest.block)
    if (data.block) {
      // If block is allocated, alert the user
      alert(`You are already allocated to block: ${data.block}. You can't book again.`);
    } else {

      navigate("/booking_form", {
        state: {
          floorData: fl,
          blockData: blo
        }
      });
    }
  };
  return (
    <div className=' flex justify-around items-center border-2 border-blue-200 mb-1 mt-3 p-2 shadow-md flex-wrap  md:flex-nowrap md:w-[500px] lg:w-[600px] bg-white'>
      <div className='flex flex-1 justify-around items-center gap-1 md:flex-nowrap'>
        <div>
          <h2 className=' text-xs sm:text-sm lg:text-lg font-semibold text-gray-600'>FLOOR NO {fl.floorNumber}</h2>
        </div>
        <div>
          <h3 className='text-xs sm:text-sm lg:text-lg font-semibold text-gray-600'>No of rooms:{fl.totalRooms}</h3>
        </div>
      </div>
      <div className='flex flex-1 justify-around items-center gap-1 md:flex-nowrap'>
        <div>
          <h3 className='text-xs sm:text-sm lg:text-lg font-semibold text-gray-600'>No of vacants:{fl.availableRooms}</h3>
        </div>

        <div>
          <Button  className=' rounded text-xs md:text-sm lg:text-md' onClick={handleClick}>
            Book
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Floor