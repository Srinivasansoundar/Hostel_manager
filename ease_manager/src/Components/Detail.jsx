import React from 'react'
import { Banner, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { Link } from 'react-router-dom';
function Detail({name}) {
    const n="sr"
  return (
    <div className=' w-8/12 mx-auto '>
        <div className='flex justify-between border-2 rounded-lg shadow-sm px-7 py-3 mt-2'>
            <span className='font-semibold'>{name}:</span>
            <div className='bg-lime-500 border-2  rounded-lg py-1 px-2'>
            <Link  to={`/allotedStudent/${name}`} className=''>
                <span>Alloted Students</span>
            </Link>
            </div>
            <div className='bg-amber-400 border-2  rounded-lg py-1 px-2'>
            <Link className=''>
                <span>Waiting Students</span>
            </Link>
            </div> 
            <div className='bg-blue-200 border-2  rounded-lg py-1 px-5'>
            <Link to={`/viewblock/${name}`} className=''>
                <span>View</span>
            </Link>
            </div>         
        </div>
    </div>
  )
}

export default Detail