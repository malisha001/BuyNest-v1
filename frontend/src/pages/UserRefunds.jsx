import React from 'react'
import { useEffect, useState,useContext } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import {toast} from 'react-toastify';
import axios from 'axios';

export default function UserRefunds() {

    const { token, backendUrl } = useContext(ShopContext);
    const [userRefunds, setUserRefunds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRefunds = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/order/get-refunds');
                if (response.data.success) {
                    setUserRefunds(response.data.refunds);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        }
        fetchRefunds();
    }, [token, backendUrl])

return (
    <div>
            <h1 className='text-2xl font-semibold text-gray-800'>Refunds</h1>
            <div className='flex flex-col gap-4 mt-4 overflow-auto' style={{ maxHeight: '500px' }}>
                    {userRefunds.length > 0 ? (
                    <>
                            <p className='text-gray-600'>Total Refunds: {userRefunds.length}</p>
                            {userRefunds.map(refund => (
                            <div key={refund._id} className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md border border-black'>
                                    <p><span className='font-semibold'>Order ID:</span> {refund.orderID}</p>
                                    <p><span className='font-semibold'>User ID:</span> {refund.userID}</p>
                                    <p><span className='font-semibold'>Reasons:</span> {refund.reasons}</p>
                                    <p><span className='font-semibold'>Additional Info:</span> {refund.additionalInfo}</p>
                                    <p><span className='font-semibold'>Date:</span> {new Date(refund.date).toLocaleString()}</p>
                                    <p><span className='font-semibold'>Request Date:</span> {new Date(refund.requestDate).toLocaleString()}</p>
                                    <p><span>{refund.status}</span></p>
                                    {refund.reasons === 'damaged' && (
                                            <p className='text-red-500'>Please return the damaged item to the nearest store.</p>
                                    )}
                                    {refund.reasons === 'missmatch' && (
                                            <p className='text-blue-500'>Please contact customer support for further assistance on your Mismatched item.</p>
                                    )}
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
