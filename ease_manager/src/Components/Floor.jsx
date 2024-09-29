import React,{} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react'
function Floor({fl,blo}) {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate("/booking_form", { state:{
        floorData:fl,
        blockData:blo
    }});

  }
  console.log(fl)
  return (
    <div className=' flex justify-around items-center border-2 mt-3 p-2 shadow-md'>
        <div>
            <h2 className='text-lg font-semibold text-gray-600'>FLOOR NO {fl.floorNumber}</h2>
        </div>
        <div>
            <h3 className='font-semibold text-gray-600'>No of rooms:{fl.totalRooms}</h3>
        </div>
        <div>
            <h3 className='font-semibold text-gray-600'>No of vacants:{fl.availableRooms}</h3>
        </div>
        <div>
            <Button color="blue" className='rounded' onClick={handleClick}>
            Book
            </Button>
        </div>
    </div>
  )
}

export default Floor