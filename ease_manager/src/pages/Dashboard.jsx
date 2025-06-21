import React, { useState, useContext, useEffect } from 'react'
import { Sidebar, Navbar, TextInput, Button, Avatar, Carousel, Dropdown } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai'
import { useLocation, Link } from 'react-router-dom';
import DashProfile from '../Components/DashProfile';
import "../styles/sidebar.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cardslider from '../Components/Cardslider';
import Block from '../Components/Block';
import DashSidebar from '../Components/DashSidebar';
import { signoutSuccess } from '../redux/user/userSlice';
import Complaints from './Complaints';
import View_complaint from './View_complaint';
import { FaBars } from 'react-icons/fa';
const Dashboard = () => {
  // const { data } = useContext(DataContext);
  const { currentUser } = useSelector((state) => state.user)
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [sidebarsize, setsidebarsize] = useState(true)
  console.log(currentUser)
  // const {rest,availableBlocks}=data
  // console.log(currentUser.availableBlocks);
  // useEffect(() => {
  //   console.log('Data has changed:', rest);
  // }, [data]); // Logs whenever `data` changes
  //console.log(currentUser)
  const dispatch = useDispatch()
  const location = useLocation()
  const [tab, setTab] = useState("")
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSideBarOpen(false); // Hide sidebar
        setsidebarsize(false)
      } else {
        setIsSideBarOpen(true);  // Show sidebar
        setsidebarsize(true)
      }
    };

    handleResize(); // Call on initial render

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    //console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
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
    <div className='min-h-screen !bg-dashboard flex flex-col md:flex-row '>
      <div>
        <button
            className="md:hidden fixed  p-2 m-2 text-white bg-blue-600 rounded z-30"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            {isSideBarOpen ? <FaBars /> : <FaBars />}
          </button>
        <div className={`  ${isSideBarOpen ? "h-full fixed w-1/3 md:w-1/5 border-2 border-gray-300 bg-sidebar min-h-screen z-10" : "hidden"} `}>
          <DashSidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
        </div>
      </div>
      {tab === 'dashboard' &&
        <div className={` bg-dashboard  h-auto flex flex-col ${sidebarsize?"ri w-4/5":"w-[90%] mx-auto mt-11"}`}>
          <Navbar className='navbar font-bold text-md md:text-xl bg-dashboard border-b-2 border-blue-200'>
            <div className='flex justify-around w-full'>
              <h1 className=' text-md leading-6 md:text-xl md:leading-9'>Hostel Room Booking</h1>
              <div>
                {/* <form>
                  <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='search hidden rounded-full lg:inline '
                  />
                </form> */}
              </div>
              <div className=''>
                <a href="/Waiting_list">
                  <button className=' font-poppins rounded p-0 min-w-20 h-12 md:text-[1rem] w px-3 bg-button text-white text-sm text-wrap hover:bg-buttonhover' >
                    Waiting List
                  </button>
                </a>
              </div>
              <hr className='hr ml-7' />
              <div className="flex flex-wrap gap-2">
                {/* <Avatar img="./avatar.jpg" rounded />
                <div>
                  <h4 className='font-bold'>Ram</h4>
                  <p className='font-light text-sm'>Student</p>
                </div> */}
                {currentUser ? (
                  <Dropdown
                    arrowIcon={false} inline label={
                      <Avatar alt='user' img="./avatar.jpg" rounded />
                    }>
                    <Dropdown.Header>
                      <span className='block text-sm'>@{currentUser.rest.name}</span>
                      <span className='block text-sm font-medium truncate'>{currentUser.rest.rollNumber}</span>
                    </Dropdown.Header>
                    <Link to='/dashboard?tab=profile'>
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignout}> Sign out</Dropdown.Item>
                  </Dropdown>

                ) : (
                  <Link to='/sign-in'>
                    <Button gradientDuoTone="purpleToBlue" outline>
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Navbar>
          {/* <div className="h-26 p-5 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slideInterval={5000}>
              <img src="./room.jpg" className='im' alt="..." />
              <img src="./fees.jpg" className='im' alt="..." />
            
            </Carousel>
          </div> */}
          <div className="App">
            <Cardslider />
          </div>
          {currentUser.availableBlocks.map((i, ind) => (
            <Block key={ind} b={i} />
          ))}
          {/* <Block />
          <Block /> */}
        </div>
      }
      {tab === 'viewcomplaints' && <View_complaint />}
      {tab === 'profile' && <DashProfile  />}
      {tab === 'complaints' && <Complaints />}
    </div>

  )
}

export default Dashboard
