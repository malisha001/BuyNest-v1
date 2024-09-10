import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import Title from '../components/Title';

const TrackOrder = () => {
  const { orderId } = useParams(); // Get the order ID from the URL
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderDetails, setOrderDetails] = useState(null);

  const loadOrderDetails = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/details`, { orderId }, { headers: { token } });
      if (response.data.success) {
        setOrderDetails(response.data.order);
      }
    } catch (error) {
      console.error('Error loading order details', error);
    }
  };

  useEffect(() => {
    if (orderId && token) {
      loadOrderDetails();
    }
  }, [orderId, token]);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className='container mx-auto py-10'>
      <div className='text-2xl mb-6'>
        <Title text1={'TRACK'} text2={'ORDER'} />
      </div>

      <div className='bg-white shadow-md p-6 rounded-lg'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between'>
            <p>Order ID: <span className='font-semibold'>{orderDetails._id}</span></p>
            <p>Status: <span className={`font-semibold ${orderDetails.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>{orderDetails.status}</span></p>
          </div>
          <div className='flex justify-between'>
            <p>Order Date: <span className='font-semibold'>{new Date(orderDetails.date).toDateString()}</span></p>
            <p>Payment Method: <span className='font-semibold'>{orderDetails.paymentMethod}</span></p>
          </div>
          <div className='border-t pt-4'>
            <h3 className='font-bold text-lg mb-3'>Items:</h3>
            {orderDetails.items.map((item, index) => (
              <div key={index} className='flex justify-between text-sm'>
                <p>{item.name} - {item.size}</p>
                <p>{currency}{item.price} x {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <h3 className='font-bold text-lg mb-3'>Tracking Progress:</h3>
        <div className='border rounded-lg p-4'>
          <ul className='flex justify-between'>
            <li className={`text-sm ${orderDetails.status === 'Processing' ? 'text-green-500' : 'text-gray-400'}`}>Processing</li>
            <li className={`text-sm ${orderDetails.status === 'Shipped' ? 'text-green-500' : 'text-gray-400'}`}>Shipped</li>
            <li className={`text-sm ${orderDetails.status === 'Out for Delivery' ? 'text-green-500' : 'text-gray-400'}`}>Out for Delivery</li>
            <li className={`text-sm ${orderDetails.status === 'Delivered' ? 'text-green-500' : 'text-gray-400'}`}>Delivered</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
