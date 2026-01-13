import React from 'react'
import UserProfile from '../UserProfile'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <div className='h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30'>
    <div className='container mx-auto flex items-center justify-between gap-3'>
      <Link to='/dashboard'>
        <h2 className='text-lg font-medium text-black md:text-xl leading-5'>
          Resume Builder
        </h2>
      </Link>
      
     
      <UserProfile />
    </div>
   </div>
  )
}

export default Navbar