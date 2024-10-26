import React from 'react'
import { Label } from 'flowbite-react'
import { Link } from 'react-router-dom'
function User() {
  return (
    <div className='flex h-screen justify-center items-center'>
        <div className='flex gap-20 '>
            
                <Link to='/adminlogin'>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                    <img src="./admin.png" alt="admin"/>
                    <Label className='text-center text-xl'>Admin</Label>
                    </div>
                </Link>
           
            
                <Link to='/studentlogin'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <img src="./user.png" alt="admin"/>
                    <Label className='text-center text-xl'>User</Label>
                    </div>
                </Link>
        </div>
    </div>
  )
}

export default User