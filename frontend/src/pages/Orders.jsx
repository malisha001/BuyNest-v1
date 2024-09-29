import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['orderId'] = order._id; // Capture the order ID for tracking
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Navigate to the track order page
  const handleTrackOrder = (orderId) => {
    navigate(`/track-order/${orderId}`); // Use navigate to go to the TrackOrder page
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-10 lg:px-20">
      {/* Title Section */}
      <div className="text-center text-4xl font-bold pt-10 border-t border-gray-200 mb-10">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {orderData.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No orders found</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Product Image and Details */}
                <div className="flex items-start gap-6">
                  <img className="w-20 h-20 rounded-lg object-cover" src={item.image[0]} alt={item.name} />
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-base text-gray-600">
                      <p className="font-medium">{currency}{item.price}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Order Date: {new Date(item.date).toDateString()}</p>
                    <p className="text-sm text-gray-500">Payment: {item.paymentMethod}</p>
                  </div>
                </div>

                {/* Order Status and Track Button */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-4 justify-between w-full md:w-1/2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <p className="text-gray-700 text-base">{item.status}</p>
                  </div>
                  <button
                    onClick={() => handleTrackOrder(item.orderId)}
                    className="border border-[#124271] text-[#124271] hover:bg-[#124271] hover:text-white py-2 px-4 rounded-lg font-medium shadow-sm transition-all duration-300"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
