import React, { useState,useContext,useEffect} from 'react'
import { Sidebar, Navbar, TextInput, Button, Avatar, Carousel,Dropdown } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { useSelector,useDispatch} from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai'
import { useLocation,Link } from 'react-router-dom';
import DashProfile from '../Components/DashProfile';
import "../styles/sidebar.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cardslider from '../Components/Cardslider';
import Block from '../Components/Block';
import DashSidebar from '../Components/DashSidebar';
import { signoutSuccess } from '../redux/user/userSlice';
const Dashboard = () => {
  // const { data } = useContext(DataContext);
  const {currentUser}=useSelector((state) => state.user) 
  console.log(currentUser)
  // const {rest,availableBlocks}=data
  // console.log(currentUser.availableBlocks);
  // useEffect(() => {
  //   console.log('Data has changed:', rest);
  // }, [data]); // Logs whenever `data` changes
   //console.log(currentUser)
   const dispatch=useDispatch()
   const location=useLocation()
    const [tab,setTab]=useState("")
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
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className=' side sidebar block  w-1/5 h-screen border-2'>
         <DashSidebar/>
      </div>
      {tab=='dashboard' &&
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
                <a href="/Waiting_list">
                  <Button color="blue" className='rounded'>
                    Waiting List
                  </Button>
                </a>
              </div>
              <hr className='hr' />
              <div className="flex flex-wrap gap-2">
                {/* <Avatar img="./avatar.jpg" rounded />
                <div>
                  <h4 className='font-bold'>Ram</h4>
                  <p className='font-light text-sm'>Student</p>
                </div> */}
                 {currentUser?(
                  <Dropdown 
                  arrowIcon={false} inline label={
                  <Avatar alt='user' img="./avatar.jpg" rounded/>
                  }>
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.rest.name}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.rest.rollNumber}</span>
                    </Dropdown.Header>
                   <Link to='/dashboard?tab=profile'>
                     <Dropdown.Item>Profile</Dropdown.Item>
                   </Link>
                   <Dropdown.Divider/>
                   <Dropdown.Item onClick={handleSignout}> Sign out</Dropdown.Item>
                  </Dropdown>
           
                ):(
                <Link to='/sign-in'>
                    <Button gradientDuoTone="purpleToBlue" outline>
                        Sign In
                    </Button>
                </Link>
                ) }
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
          {currentUser.availableBlocks.map((i,ind)=>(
            <Block key={ind} b={i}/>
          ))}
          {/* <Block />
          <Block /> */}
        </div>
      }
      {tab=='profile' && <DashProfile/> }
    </div>

  )
}

export default Dashboard
