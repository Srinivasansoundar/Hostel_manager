import React,{useState,useEffect} from 'react'
import { Sidebar } from 'flowbite-react'
import { useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
function DashSidebar() {
    const location=useLocation()
    const [tab,setTab]=useState("")
    const dispatch=useDispatch()
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search)
      const tabFromUrl=urlParams.get('tab')
      //console.log(tabFromUrl);
      if(tabFromUrl){
        setTab(tabFromUrl)
      }
    },[location.search])
    const handleSignout = async () => {
        try {
          const res = await fetch('/api/student/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <Sidebar className='w-full' aria-label="Sidebar with logo branding example">
    <Sidebar.Logo href="/" className='' img="./psg_icon.jpg" imgAlt="Flowbite logo">
      PSG Hostel
    </Sidebar.Logo>
    <Sidebar.Items className=''>
      <Sidebar.ItemGroup>
        <Sidebar.Item active={tab==="dashboard"} href="/dashboard?tab=dashboard" icon={HiChartPie}>
          Dashboard
        </Sidebar.Item>
        {/* <Sidebar.Item href="#" icon={HiViewBoards}>
          Room allocation
        </Sidebar.Item> */}
        <Sidebar.Item href="#" icon={HiInbox}>
          Complaints
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiUser}>
          Feedback
        </Sidebar.Item>
        <Sidebar.Item active={tab==='profile'} href="/dashboard?tab=profile" icon={HiUser}>
          Profile
        </Sidebar.Item>
        <Sidebar.Item href='#' onClick={handleSignout} icon={HiShoppingBag}>
          Signout
        </Sidebar.Item>
        {/* <Sidebar.Item href="#" icon={HiArrowSmRight}>
          Sign In
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiTable}>
          Sign Up
        </Sidebar.Item> */}
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default DashSidebar