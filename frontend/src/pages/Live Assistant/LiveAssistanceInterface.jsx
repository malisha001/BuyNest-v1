import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaPlay, FaCartArrowDown, FaShoppingCart, FaFlag, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // For fetching product details and chat messages
import { io } from 'socket.io-client'; // Import Socket.IO client

const LiveAssistanceInterface = () => {
  const location = useLocation();
  const { cart = {}, request } = location.state || {};
  const [products, setProducts] = useState({});
  const [currentCart, setCurrentCart] = useState(cart);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMessages, setVoiceMessages] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(''); // New message input
  const socket = io('http://localhost:4000');

  useEffect(() => {
    // Fetch product details for each item in the cart when the component mounts
    const fetchProductDetails = async () => {
      const productDetails = {};
      for (const itemId of Object.keys(currentCart)) {
        try {
          const response = await axios.get(`http://localhost:4000/api/product/${itemId}`);
          if (response.data.success) {
            productDetails[itemId] = response.data.product;
          }
        } catch (error) {
          console.error(`Error fetching product ${itemId}:`, error);
        }
      }
      setProducts(productDetails);
    };

    // Fetch chat messages when the component mounts
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/messages/${request.userId}`);
        if (response.data.success) {
          setChatMessages(response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchProductDetails();
    fetchChatMessages();

    // Listen for cart updates in real-time
    socket.on('cart_updated', (updatedCart) => {
      setCurrentCart(updatedCart);
    });

    return () => {
      socket.off('cart_updated');
    };
  }, [currentCart, request.userId]);

  // Toggle voice chat (simulating start and stop of voice interaction)
  const toggleVoiceChat = () => {
    setIsSpeaking(!isSpeaking);
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      userId: request.userId,
      userEmail: request.userEmail,
      content: newMessage,
      from: 'assistant', // Since this is the assistant's interface
    };

    try {
      const response = await axios.post('http://localhost:4000/api/messages', messageData);
      if (response.data.success) {
        setChatMessages([...chatMessages, response.data.message]); // Update chat messages
        setNewMessage(''); // Clear the input field
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
          
          {/* Voice Chat and Messages Section */}
          <section className={`relative rounded-2xl p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 ${lightMode ? 'bg-white' : 'bg-white/10'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-3xl font-bold ${lightMode ? 'text-gray-800' : 'text-white'}`}>Chat Messages</h2>
              <span className="absolute top-2 right-2 animate-pulse bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md">
                Visually Impaired
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col space-y-4 h-64 overflow-y-auto">
              {chatMessages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-4 rounded-xl shadow-md ${msg.from === 'assistant' ? 'bg-blue-500' : 'bg-green-500'} ${lightMode ? 'text-gray-800' : 'text-white'}`}
                >
                  <div className="text-sm">{msg.content}</div>
                  <div className="text-xs mt-2">{new Date(msg.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex mt-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-3 rounded-l-lg border-gray-300"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-lg"
              >
                Send
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
                      onClick={() => window.open(`/product/${itemId}`, '_blank')}
                      className={`rounded-xl p-4 flex justify-between items-center shadow-md ${lightMode ? 'bg-gray-100' : 'bg-white/10'} hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
                    >
                      <div>
                        <p className={`text-lg font-semibold ${lightMode ? 'text-gray-800' : 'text-gray-100'}`}>
                          {products[itemId]?.name || `Item ID: ${itemId}`}
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
