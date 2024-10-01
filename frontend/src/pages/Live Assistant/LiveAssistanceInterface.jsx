import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaPaperPlane, FaShoppingCart, FaFlag, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const LiveAssistanceInterface = () => {
  const [products, setProducts] = useState({});
  const [currentCart, setCurrentCart] = useState({});
  const [voiceMessages, setVoiceMessages] = useState([]); // To store all messages (user + support)
  const [lightMode, setLightMode] = useState(false);
  const [typedMessage, setTypedMessage] = useState(''); // Support's message input
  const socket = io('http://localhost:4000');
  const navigate = useNavigate();

  // Fetch user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Retrieve user info from localStorage
  const userId = userInfo?.id; // Get userId from userInfo object
  const userEmail = userInfo?.email;
  const userName = userInfo?.name;

  useEffect(() => {
    if (!userId) {
      console.error('User info not found in localStorage');
      return;
    }

    const fetchProductDetails = async () => {
      const productDetails = {};
      try {
        const response = await axios.get(`http://localhost:4000/api/cart/${userId}`);
        const cartData = response.data.cart; // Assuming cart is returned here
        setCurrentCart(cartData);

        for (const itemId of Object.keys(cartData)) {
          const productResponse = await axios.get(`http://localhost:4000/api/product/${itemId}`);
          productDetails[itemId] = productResponse.data.product;
        }
        setProducts(productDetails);
      } catch (error) {
        console.error('Error fetching cart or product details:', error);
      }
    };

    const fetchUserMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/messages/${userId}`);
        setVoiceMessages(response.data.messages); // All messages from both user and support
      } catch (error) {
        console.error('Error fetching user messages:', error);
      }
    };

    fetchProductDetails();
    fetchUserMessages();

    // Socket.IO for real-time messages
    socket.emit('join_room', userId); // Join the room for the user

    socket.on('new_message', (newMessage) => {
      setVoiceMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('cart_updated', (updatedCart) => {
      setCurrentCart(updatedCart);
    });

    const intervalId = setInterval(fetchUserMessages, 2000);

    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
      socket.off('new_message');
      socket.off('cart_updated');
    };
  }, [userId]);

  const handleSendMessage = async () => {
    if (typedMessage.trim() === '') return;

    const newMessage = {
      userId,
      userEmail,
      content: typedMessage,
      from: 'assistant',
    };

    try {
      await axios.post('http://localhost:4000/api/messages', newMessage);
      setVoiceMessages((prevMessages) => [...prevMessages, newMessage]);
      setTypedMessage(''); // Clear the input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const endSession = () => {
    setLightMode(true); // Change to light mode after ending session
    navigate('/assistant-dashboard'); // Redirect back to the dashboard
  };

  return (
    <div className={`min-h-screen py-8 px-4 lg:px-16 transition-all duration-300 ${lightMode ? 'bg-white' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`flex justify-between items-center mb-8 ${lightMode ? 'bg-white' : 'bg-gradient-to-r from-gray-100 via-white to-gray-200'} p-6 rounded-t-2xl shadow-xl`}>
        <h1 className={`text-4xl font-bold ${lightMode ? 'text-gray-800' : 'text-gray-800'} drop-shadow-md`}>
          Live Assistance Interface
        </h1>
        <div className="text-lg text-gray-600">
          User: <span className={`font-bold ${lightMode ? 'text-black' : 'text-gray-800'}`}>{userName}</span>
        </div>
      </header>

      <main className={`p-6 rounded-2xl shadow-2xl transition-all duration-300 ${lightMode ? 'bg-gray-100 text-gray-800' : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Voice Chat Section */}
          <section className={`relative rounded-2xl p-6 shadow-2xl ${lightMode ? 'bg-gray-50' : 'bg-gray-800'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-3xl font-bold ${lightMode ? 'text-gray-800' : 'text-white'}`}>Voice Chat</h2>
            </div>

            {/* Display Messages Section */}
            <div className={`flex flex-col space-y-4 h-72 overflow-auto p-4 rounded-xl ${lightMode ? 'bg-white' : 'bg-gray-700'}`}>
              {voiceMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.from === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`relative max-w-xs p-3 rounded-xl text-sm shadow-md 
                      ${msg.from === 'assistant' ? 
                        'bg-gray-200 text-gray-900' : 
                        'bg-green-500 text-white'} 
                      ${msg.from === 'assistant' ? 'rounded-tl-none' : 'rounded-tr-none'}
                      ${lightMode ? 'shadow-lg' : ''}`}
                    style={{ 
                      border: '1px solid rgba(0, 0, 0, 0.1)', // Soft inner border
                      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)', // Inner shadow for depth
                    }}
                  >
                    {msg.content}
                    {/* Adding an extra inner decorative element */}
                    <span className="absolute inset-0 rounded-xl border border-white opacity-20 pointer-events-none"></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="mt-4 flex items-center">
              <button className="bg-gray-200 text-gray-700 rounded-full p-3 mr-3">
                <FaMicrophone />
              </button>
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 px-4 py-2 rounded-full focus:outline-none 
                  ${lightMode ? 'bg-gray-100 text-gray-800' : 'bg-gray-700 text-white'}`}
              />
              <button onClick={handleSendMessage} className="ml-3 bg-blue-600 text-white rounded-full p-3">
                <FaPaperPlane />
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
                      onClick={() => window.open(`/product/${itemId}`, '_blank')} // Open product page
                      className={`rounded-xl p-4 flex justify-between items-center shadow-md ${lightMode ? 'bg-gray-100' : 'bg-white/10'} hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
                    >
                      <div>
                        <p className={`text-lg font-semibold ${lightMode ? 'text-gray-800' : 'text-gray-100'}`}>
                          {products[itemId]?.name || `Item ID: ${itemId}`}
                        </p>
                        <p className={`text-sm ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>Size: {size}</p>
                        <p className={`text-sm ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>Quantity: {quantity}</p>
                      </div>
                    </li>
                  ))
                ))
              ) : (
                <p className="text-gray-400">No items in the cart.</p>
              )}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LiveAssistanceInterface;
