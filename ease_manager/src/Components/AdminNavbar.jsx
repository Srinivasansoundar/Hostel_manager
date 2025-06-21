import React from 'react'
import { Button, Navbar } from "flowbite-react";
function AdminNavbar() {
  return (
    <Navbar  className='bg-slate-100'fluid rounded>
      <Navbar.Brand href="">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Admin</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* <Button>Get started</Button> */}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#">
          Home
        </Navbar.Link>
        <Navbar.Link href="admin/complaints">Complaints</Navbar.Link>
        <Navbar.Link href="#">Feedback</Navbar.Link>
        <Navbar.Link href="/">Sign out</Navbar.Link>
        {/* <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AdminNavbar