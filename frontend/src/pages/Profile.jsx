import React from 'react'
import Title from '../components/Title'

export default function Profile() {
  return (
    <div className="container mx-auto py-10 px-6">
      <div className='text-center text-2xl'>
        <Title text1={'YOUR'} text2={'PROFILE'} />
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="text-2xl font-bold items-start mt-3 gap-2">Profile Details</div>
        <table className="items-center">
          <tr>
            <td><text className="text-md font-semibold">Name:</text></td>
            <td><text className="text-md">John Doe</text></td>
          </tr>
          <tr>
            <td><text className="text-md font-semibold">Email:</text></td>
            <td><text className="text-md">sample@gmail.com</text></td>
          </tr>
        </table>
        <div className="text-2xl font-bold mt-3">Order History</div>
        <button className="px-4 py-2 bg-[#124271] text-white rounded-full shadow-md hover:bg-[#0E365A] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#124271] my-5">
          Log-Out</button>
      </div>
    </div>
  )
}
