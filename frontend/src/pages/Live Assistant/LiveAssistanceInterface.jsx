import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaPlay, FaCartArrowDown, FaShoppingCart, FaFlag, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // For fetching product details and chat messages
import { io } from 'socket.io-client'; // Import Socket.IO client
import { FaPaperPlane } from 'react-icons/fa';

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
          <section className={`relative rounded-2xl p-6 shadow-2xl ${lightMode ? 'bg-white' : 'bg-gray-800'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-3xl font-bold ${lightMode ? 'text-gray-800' : 'text-white'}`}>Chat Messages</h2>
              <span className="absolute top-2 right-2 animate-pulse bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md">
                Visually Impaired
              </span>
            </div>

            {/* Chat Messages */}
            <div
  className={`flex flex-col space-y-4 overflow-y-auto p-4 rounded-xl ${lightMode ? 'bg-gray-200' : 'bg-gray-700'}`}
  style={{
    maxHeight: '20rem',  // This limits the height to fit approximately 5 chat messages
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: `${lightMode ? '#A0AEC0 #E2E8F0' : '#4A5568 #2D3748'}`, // Custom scrollbar colors
  }}
>
  {chatMessages.slice(-10).map((msg) => (  // Display the last 5 messages only
    <div
      key={msg._id}
      className={`flex ${msg.from === 'assistant' ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`relative p-3 rounded-lg shadow-md 
          ${msg.from === 'assistant' ? 'bg-gray-200 text-gray-900' : 'bg-green-500 text-white'} 
          ${lightMode ? 'shadow-lg' : ''}`}
        style={{
          border: '1px solid rgba(0, 0, 0, 0.1)', // Soft inner border
          boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)', // Inner shadow for depth
        }}
      >
        {msg.content}
        <div className="text-xs mt-1 text-gray-500">
          {new Date(msg.createdAt).toLocaleString()}
        </div>
      </div>
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
    className="w-full p-3 rounded-full border-gray-300 text-black"  // Fully rounded input
  />
  <button
    onClick={handleSendMessage}
    className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 p-3 rounded-full ml-2 flex justify-center items-center"  // Increased width and height, fully rounded
  >
    <FaPaperPlane className="text-white text-xl" />  {/* Larger Send icon */}
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
