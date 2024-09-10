import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaPlay, FaCartArrowDown, FaShoppingCart, FaFlag, FaTimes } from 'react-icons/fa';

// Sample cart items
const sampleCartItems = [
  { id: 1, name: 'Nike Running Shoes', price: 89.99, quantity: 1 },
  { id: 2, name: 'Adidas Sweatshirt', price: 59.99, quantity: 2 },
  { id: 3, name: 'Sony Headphones', price: 129.99, quantity: 1 },
];

// Sample voice messages
const sampleVoiceMessages = [
  { id: 1, time: '00:12', role: 'helper', playing: false },
  { id: 2, time: '00:15', role: 'user', playing: false },
];

const LiveAssistanceInterface = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [voiceMessages, setVoiceMessages] = useState([]);
  const [lightMode, setLightMode] = useState(false); // Light mode state

  useEffect(() => {
    // Simulate fetching user's cart and voice messages
    setCartItems(sampleCartItems);
    setVoiceMessages(sampleVoiceMessages);
  }, []);

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

  // End session: Switch to light mode
  const endSession = () => {
    setLightMode(true);
  };

  return (
    <div className={`min-h-screen py-8 px-4 lg:px-16 transition-all duration-300 ${lightMode ? 'bg-white' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`flex justify-between items-center mb-8 ${lightMode ? 'bg-white' : 'bg-gradient-to-r from-gray-100 via-white to-gray-200'} p-6 rounded-t-2xl shadow-xl`}>
        <h1 className={`text-4xl font-bold ${lightMode ? 'text-gray-800' : 'text-gray-800'} drop-shadow-md`}>Live Assistance Interface</h1>
        <div className="text-lg text-gray-600">
          User: <span className={`font-bold ${lightMode ? 'text-black' : 'text-gray-800'}`}>Matheesha</span>
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
                    {/* Simulate a playing state */}
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
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <li
                    key={item.id}
                    className={`rounded-xl p-4 flex justify-between items-center shadow-md ${lightMode ? 'bg-gray-100' : 'bg-white/10'} hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div>
                      <p className={`text-lg font-semibold ${lightMode ? 'text-gray-800' : 'text-gray-100'}`}>{item.name}</p>
                      <p className={`text-sm ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>Price: ${item.price.toFixed(2)}</p>
                      <p className={`text-sm ${lightMode ? 'text-gray-600' : 'text-gray-400'}`}>Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-gray-400">
                      <FaCartArrowDown />
                    </div>
                  </li>
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
