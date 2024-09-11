import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setToken }) => {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <div 
      className='sticky top-0 z-50 flex items-center py-4 px-[4%] justify-between' 
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background
        backdropFilter: 'blur(10px)', // Glass-like blur effect
        minHeight: '100px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border for the glossy effect
      }}
    >
      <div onClick={() => navigate('/')} className='cursor-pointer'>
        <img className='w-[max(15%,100px)] h-auto' src={assets.logo} alt="Logo" />
      </div>
      <button 
        onClick={() => setToken('')} 
        className='bg-gray-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
