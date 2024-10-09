import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

export default function OrderCancellation() {

  const [refunds, setRefunds] = useState([]);

  const handelReject = () => {

    const updateStatus = async (id) => {
      try {
        const response = await axios.post(backendUrl + '/api/order/refund-status', { refundID: id, status: 'Rejected' });
        if (response.data.success) {
          toast.success(response.data.message);

        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    }
    
  }
  const handelApprove = () => {

  }
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
    handelReject();
    fetchRefunds();
  })

  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800'>Refunds</h1>
      <div className='flex flex-col gap-4 mt-4 overflow-auto' style={{ maxHeight: '500px' }}>
        {refunds.length > 0 ? (
          <>
            <p className='text-gray-600'>Total Refunds: {refunds.length}</p>
            {refunds.map(refund => (
              <div key={refund._id} className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md'>
                <p><span className='font-semibold'>Order ID:</span> {refund.orderID}</p>
                <p><span className='font-semibold'>User ID:</span> {refund.userID}</p>
                <p><span className='font-semibold'>Reasons:</span> {refund.reasons}</p>
                <p><span className='font-semibold'>Additional Info:</span> {refund.additionalInfo}</p>
                <p><span className='font-semibold'>Date:</span> {new Date(refund.date).toLocaleString()}</p>
                <p><span className='font-semibold'>Request Date:</span> {new Date(refund.requestDate).toLocaleString()}</p>
                <p><span className='font-bold text-xl'>{refund.status}</span></p>
              </div>
            ))}
          </>
        ) : (
          <p>No refunds</p>
        )}
      </div>
    </div>
  )
}
