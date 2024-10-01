import React, { useState, useEffect, useContext } from 'react';
import { FaClock, FaSearch, FaPowerOff, FaTrashAlt } from 'react-icons/fa'; // Added FaTrashAlt icon for the remove button
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../../context/ShopContext'; // Assuming ShopContext manages cart-related data

const AssistantDashboard = () => {
  const [availability, setAvailability] = useState(false); // Track assistant's availability status
  const [sessionRequests, setSessionRequests] = useState([]); // List of session requests from users
  const navigate = useNavigate();

  // Access token from ShopContext (or any other auth method you use)
  const { token } = useContext(ShopContext); 

  // Fetch session requests on component mount
  useEffect(() => {
    const fetchSessionRequests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/assist'); // Fetch assist requests from backend
        if (response.data.success) {
          setSessionRequests(response.data.assist); // Set session requests to state
        } else {
          console.error('Failed to fetch session requests:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching session requests:', error);
      }
    };

    fetchSessionRequests();
  }, []);

  // Function to handle accepting a session request
  const handleAccept = async (request) => {
    try {
      const requestId = request._id; // Get the request's ID
      const userId = request.userId; // Get the user's ID

      // Fetch the user's cart data using their userId
      const cartResponse = await axios.post('http://localhost:4000/api/cart/get', { userId });

      if (cartResponse.data.success) {
        const cartItems = cartResponse.data.cartData; // Retrieve the user's cart data

        // Mark the assist request as accepted by updating its 'accept' status
        const acceptResponse = await axios.put(`http://localhost:4000/api/assist/${requestId}`, { accept: true });

        if (acceptResponse.data.success) {
          // Navigate to the Live Assistance Interface with cart data and the session request
          navigate('/assis-live', { state: { cart: cartItems, request } });
        } else {
          console.error('Failed to update the request accept status:', acceptResponse.data.message);
        }
      } else {
        console.error('Error fetching cart data:', cartResponse.data.message);
      }
    } catch (error) {
      console.error('Error during session acceptance:', error);
    }
  };

  // Function to handle removing a session request
  const handleRemove = async (requestId) => {
    try {
      // Send a delete request to remove the session
      const response = await axios.delete(`http://localhost:4000/api/assist/${requestId}`);

      if (response.data.success) {
        // Filter out the removed request from the sessionRequests state
        setSessionRequests(sessionRequests.filter(request => request._id !== requestId));
      } else {
        console.error('Failed to remove the request:', response.data.message);
      }
    } catch (error) {
      console.error('Error removing the session request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 lg:px-16">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-gradient-to-r from-gray-100 via-white to-gray-200 p-6 rounded-t-2xl shadow-xl relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md">Assistant Dashboard</h1>

        {/* Toggle Switch for Availability */}
        <div
          onClick={() => setAvailability(!availability)} 
          className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${availability ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <div className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform transform bg-white ${availability ? 'translate-x-8' : ''}`}>
            <FaPowerOff className={`text-sm m-1 ${availability ? 'text-green-500' : 'text-red-500'}`} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 rounded-2xl shadow-2xl mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Session Requests Section */}
          <section className={`rounded-2xl p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 ${availability ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-3xl font-bold ${availability ? 'text-white' : 'text-gray-800'}`}>Session Requests</h2>
              <FaSearch className={`cursor-pointer transition duration-200 ${availability ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`} />
            </div>

            {/* If session requests exist, show them */}
            {sessionRequests.length > 0 ? (
              <ul className="space-y-3">
                {sessionRequests.map((request) => (
                  <li
                    key={request._id}  // Assuming request has _id field
                    className={`rounded-xl p-3 flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:translate-y-1 ${availability ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <div>
                      <p className={`text-lg font-semibold ${availability ? 'text-gray-100' : 'text-gray-800'}`}>{request.name}</p>
                      <p className={`text-sm ${availability ? 'text-gray-400' : 'text-gray-500'}`}>{request.type || "Live Assistance"}</p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className={`mr-2 ${availability ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`${availability ? 'text-gray-400' : 'text-gray-600'}`}>{request.time || "Recently"}</span>
                    </div>
                    <div className="flex space-x-4">
                      {/* Accept Button */}
                      <button 
                        onClick={() => handleAccept(request)}  // Accept the session request
                        className={`ml-4 px-5 py-2 rounded-full ${availability ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} font-semibold shadow-lg transition-transform transform hover:scale-105`}
                      >
                        Accept
                      </button>

                      {/* Remove Button */}
                      <button 
                        onClick={() => handleRemove(request._id)}  // Remove the session request
                        className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`${availability ? 'text-gray-400' : 'text-gray-500'}`}>No new requests at the moment.</p>
            )}
          </section>

        </div>
      </main>
    </div>
  );
};

export default AssistantDashboard;
