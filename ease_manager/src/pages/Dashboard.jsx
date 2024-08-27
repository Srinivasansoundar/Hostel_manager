import React from 'react'
import { Sidebar, Navbar, TextInput, Button, Avatar, Carousel } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { AiOutlineSearch } from 'react-icons/ai'
import "../styles/sidebar.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cardslider from '../Components/Cardslider';
import Block from '../Components/Block';
const Dashboard = () => {
  return (
    <header className="flex">
      <div className=' side sidebar block  w-1/5 h-screen border-2'>
        <Sidebar className='w-full' aria-label="Sidebar with logo branding example">
          <Sidebar.Logo href="/" className='' img="./psg_icon.jpg" imgAlt="Flowbite logo">
            PSG Hostel
          </Sidebar.Logo>
          <Sidebar.Items className=''>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/" icon={HiChartPie}>
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
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Logout
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
      </div>
      <div className="ri bg-gray-50 w-4/5 h-screen flex flex-col">
        <Navbar className='navbar font-bold text-xl bg-gray-50 border-b-2 '>
          <div className='flex justify-around w-full'>
            <h1 className='leading-9'>Hostel Room Booking</h1>
            <div>
              <form>
                <TextInput
                  type='text'
                  placeholder='Search...'
                  rightIcon={AiOutlineSearch}
                  className='search hidden rounded-full lg:inline '
                />
              </form>
            </div>
            <div>
              <Button color="blue" className='rounded'>
                Waiting List
              </Button>
            </div>
            <hr className='hr' />
            <div className="flex flex-wrap gap-2">
              <Avatar img="./avatar.jpg" rounded />
              <div>
                <h4 className='font-bold'>Ram</h4>
                <p className='font-light text-sm'>Student</p>
              </div>
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
        <Block/>
        <Block/>
      </div>
    </header>

  )
}

export default Dashboard
