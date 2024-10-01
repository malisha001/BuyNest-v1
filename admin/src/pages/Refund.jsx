import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

export default function OrderCancellation() {

  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/order/get-refunds');
        if (response.data.success) {
          setRefunds(response.data.refunds);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    }
    fetchRefunds();
  })

  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800'>Refunds</h1>
      <div className='flex flex-col gap-4 mt-4'>
        {refunds ? (refunds.map(refund => (
          <div key={refund._id} className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md'>
            <h1>{refund._id}</h1>
            <p><span className='font-semibold'>Order ID:</span> {refund.orderID}</p>
            <p><span className='font-semibold'>User ID:</span> {refund.userId}</p>
            <p><span className='font-semibold'>Reasons:</span> {refund.reasons}</p>
            <p><span className='font-semibold'>Additional Info:</span> {refund.additionalInfo}</p>
            <p><span className='font-semibold'>Date:</span> {refund.date}</p>
            <p><span className='font-semibold'>Request Date:</span> {refund.requestDate}</p>
          </div>
        ))):<p>No refunds</p>}
      </div>
      
    </div>
  )
}
