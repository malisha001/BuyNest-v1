import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaPlay, FaCartArrowDown, FaShoppingCart, FaFlag, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // For fetching product details
import { io } from 'socket.io-client'; // Import Socket.IO client

const LiveAssistanceInterface = () => {
  const location = useLocation(); // Access cart and session data passed from AssistantDashboard
  const { cart = {}, request } = location.state || {}; // Destructure cart and request details from location.state
  const [products, setProducts] = useState({}); // Store fetched product details
  const [currentCart, setCurrentCart] = useState(cart); // Use state to store current cart
  const [isSpeaking, setIsSpeaking] = useState(false); // Simulate voice chat functionality
  const [voiceMessages, setVoiceMessages] = useState([]); // Simulate voice message data
  const [lightMode, setLightMode] = useState(false); // Toggle light and dark mode
  const socket = io('http://localhost:4000'); // Connect to the Socket.IO server

  useEffect(() => {
    // Fetch product details for each item in the cart when the component mounts
    const fetchProductDetails = async () => {
      const productDetails = {};
      for (const itemId of Object.keys(currentCart)) {
        try {
          const response = await axios.get(`http://localhost:4000/api/product/${itemId}`); // Assuming this is your product API endpoint
          if (response.data.success) {
            productDetails[itemId] = response.data.product; // Store product details using itemId as the key
          }
        } catch (error) {
          console.error(`Error fetching product ${itemId}:`, error);
        }
      }
      setProducts(productDetails); // Update state with fetched product details
    };

    fetchProductDetails();

    // Listen for cart updates in real-time
    socket.on('cart_updated', (updatedCart) => {
      console.log('Cart updated:', updatedCart);
      setCurrentCart(updatedCart); // Update cart state with the new cart data
    });

    // Simulate voice messages (you can replace this with real data)
    setVoiceMessages([
      { id: 1, time: '00:12', role: 'helper', playing: false },
      { id: 2, time: '00:15', role: 'user', playing: false },
    ]);

    return () => {
      socket.off('cart_updated'); // Clean up listener when component unmounts
    };
  }, [currentCart]);

  // Toggle voice chat (simulating start and stop of voice interaction)
  const toggleVoiceChat = () => {
    setIsSpeaking(!isSpeaking);
  };

  // Handle playing of voice messages
  const togglePlayMessage = (id) => {
    setVoiceMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, playing: !msg.playing } : msg
      )
    );
  };

  // End session and return to the assistant dashboard
  const endSession = () => {
    setLightMode(true); // Switch to light mode after ending session
    navigate('/assistant-dashboard'); // Redirect to the assistant dashboard
  };

  return (
    <div className={`min-h-screen py-8 px-4 lg:px-16 transition-all duration-300 ${lightMode ? 'bg-white' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`flex justify-between items-center mb-8 ${lightMode ? 'bg-white' : 'bg-gradient-to-r from-gray-100 via-white to-gray-200'} p-6 rounded-t-2xl shadow-xl`}>
        <h1 className={`text-4xl font-bold ${lightMode ? 'text-gray-800' : 'text-gray-800'} drop-shadow-md`}>Live Assistance Interface</h1>
        <div className="text-lg text-gray-600">
          User: <span className={`font-bold ${lightMode ? 'text-black' : 'text-gray-800'}`}>{request?.name}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className={`p-6 rounded-2xl shadow-2xl transition-all duration-300 ${lightMode ? 'bg-gray-100 text-gray-800' : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Voice Chat Section */}
          <section className={`relative rounded-2xl p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 ${lightMode ? 'bg-white' : 'bg-white/10'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-3xl font-bold ${lightMode ? 'text-gray-800' : 'text-white'}`}>Voice Chat</h2>
              
              {/* Visually Impaired Tag */}
              <span className="absolute top-2 right-2 animate-pulse bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md">
                Visually Impaired
              </span>
            </div>

            {/* Voice Messages */}
            <div className="flex flex-col space-y-4">
              {voiceMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl flex justify-between items-center shadow-md ${msg.role === 'helper' ? 'bg-blue-500' : 'bg-green-500'} ${lightMode ? 'text-gray-800' : 'text-white'}`}
                >
                  <FaMicrophone className={lightMode ? 'text-gray-600' : 'text-white'} />
                  <div
                    className={`w-3/4 h-6 bg-gray-200 rounded-full flex items-center justify-center ${msg.playing ? 'animate-pulse' : ''}`}
                  >
                    {msg.playing ? 'Playing...' : 'Audio Message'}
                  </div>
                  <span className={lightMode ? 'text-gray-600' : 'text-white'}>{msg.time}</span>
                  <button
                    onClick={() => togglePlayMessage(msg.id)}
                    className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-2 rounded-full"
                  >
                    <FaPlay />
                  </button>
                </div>
              ))}
            </div>

            {/* End and Report Session Buttons */}
            <div className="flex justify-between mt-6">
              <button onClick={endSession} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105">
                <FaTimes className="mr-2" />
                End Session
              </button>
              <button className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105">
                <FaFlag className="mr-2" />
                Report Session
              </button>
            </div>
          </section>

          {/* Cart View Section */}
          <section className={`rounded-2xl p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 ${lightMode ? 'bg-white' : 'bg-white/10'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-3xl font-bold ${lightMode ? 'text-gray-800' : 'text-white'}`}>User's Cart</h2>
              <FaShoppingCart className={`${lightMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>

            {/* Cart Items */}
            <ul className="space-y-4">
              {Object.keys(currentCart).length > 0 ? (
                Object.entries(currentCart).map(([itemId, sizes]) => (
                  Object.entries(sizes).map(([size, quantity], index) => (
                    <li
                      key={index}
                      onClick={() => window.open(`/product/${itemId}`, '_blank')} // Open the product page in a new tab
                      className={`rounded-xl p-4 flex justify-between items-center shadow-md ${lightMode ? 'bg-gray-100' : 'bg-white/10'} hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
                    >
                      <div>
                        <p className={`text-lg font-semibold ${lightMode ? 'text-gray-800' : 'text-gray-100'}`}>
                          {products[itemId]?.name || `Item ID: ${itemId}`} {/* Display the product name if available, otherwise show item ID */}
                        </p>
                        <p className={`text-sm ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>Size: {size}</p>
                        <p className={`text-sm ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>Quantity: {quantity}</p>
                      </div>
                      <div className="text-gray-400">
                        <FaCartArrowDown />
                      </div>
                    </li>
                  ))
                ))
              ) : (
                <p className={`text-gray-400`}>No items in the cart.</p>
              )}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LiveAssistanceInterface;
