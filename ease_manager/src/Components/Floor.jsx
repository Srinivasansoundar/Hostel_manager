import React from 'react'
import { Button } from 'flowbite-react'
function Floor({no,rooms,vacant}) {
  return (
    <div className=' flex justify-around items-center border-2 mt-3 p-2 shadow-md'>
        <div>
            <h2 className='text-lg font-semibold text-gray-600'>FLOOR NO {no}</h2>
        </div>
        <div>
            <h3 className='font-semibold text-gray-600'>No of rooms:{rooms}</h3>
        </div>
        <div>
            <h3 className='font-semibold text-gray-600'>No of vacants:{vacant}</h3>
        </div>
        <div>
            <Button color="blue" className='rounded'>
                Book
            </Button>
        </div>
    </div>
  )
}

export default Floor