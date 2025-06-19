import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'



export default function Layout() {
  return (
    <>


      <div className="layout min-h-screen flex flex-col justify-between align-items-between">
        {/* <Navbar /> */}
        <Navbar />
        {/* Main content area */}

        <div className="container mx-auto px-4 flex-grow py-10">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  )
}