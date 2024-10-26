import React from 'react'
import { useLocation,Link } from 'react-router-dom';
import { Banner, Button, Navbar } from "flowbite-react";
import Detail from '../Components/Detail';
import AdminNavbar from '../Components/AdminNavbar';
import { useSelector } from 'react-redux';
function AdminPage() {
  // const location=useLocation()
  // const {data}=location.state
  // console.log(data)
  const {blockData}=useSelector((state)=>state.admin)
  // console.log(blockData)
  return (
    <div>
    <AdminNavbar/>
    <div className='mt-5 p-8'>
           <h1 className='text-3xl font-semibold mb-6'>Available Blocks</h1>
           <div className=''>
              {blockData.map((i,ind)=>{
                    return <Detail key={ind} name={i.blockName}/>
                })}
           </div>
           <div className='flex justify-center items-center mt-5'>
           {/* <Button className='w-40'>
               <Link className='' to='addblock'>Add block</Link>
            </Button> */}
            </div>
    </div>
   
    </div>
  )
}

export default AdminPage