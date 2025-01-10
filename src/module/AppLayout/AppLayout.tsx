import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AppLayout = () => {
  return (
    <div className='w-full h-screen flex flex-col bg-gray-100'>
        <div><Navbar/></div>
        <div className='flex-1 w-full '>
            <Outlet/>
        </div>
    </div>
  )
}

export default AppLayout