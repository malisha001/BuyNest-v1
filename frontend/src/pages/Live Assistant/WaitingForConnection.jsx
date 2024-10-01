import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext'; // Assuming ChatContext is here

const WaitingForConnection = () => {
  const navigate = useNavigate();
  const { setIsChatOpen } = useContext(ChatContext); // Access the function to open the Floating Chat
  const [estimatedTime, setEstimatedTime] = useState(30); // Example estimated wait time in seconds
  const [loadingMessage, setLoadingMessage] = useState('Finding the best available helper for you...');

  // Simulate the countdown for the estimated wait time
  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    const messages = [
      'Finding the best available helper for you...',
      'You are in the queue...',
      'Almost connected, please hold on...',
    ];

    const messageInterval = setInterval(() => {
      setLoadingMessage((prev) => {
        const nextMessage = messages[(messages.indexOf(prev) + 1) % messages.length];
        return nextMessage;
      });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(messageInterval);
    };
  }, []);

  // Function to handle the accept and open chat
  const handleAccept = () => {
    console.log('Accept button clicked'); // Add this line
    setIsChatOpen(true);
    navigate('/home');
  };
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-lightblue-100 to-blue-200 text-gray-800 relative overflow-hidden">
      {/* Background Visuals */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-96 h-96 bg-blue-300 opacity-20 rounded-full absolute -top-10 -left-40 animate-pulse"></div>
        <div className="w-96 h-96 bg-blue-400 opacity-20 rounded-full absolute -bottom-10 -right-40 animate-pulse"></div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 tracking-wider">
        Connecting to a Helper
      </h1>

      {/* Dynamic Loading Message */}
      <p className="max-w-xl text-lg md:text-xl mb-8 text-center leading-relaxed text-gray-700">
        {loadingMessage}
      </p>

      {/* Modern Spinner with Subtle Shadow */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <div className="relative w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-md"></div>

        {/* Estimated Wait Time */}
        <p className="text-lg md:text-xl text-gray-700">
          Estimated time: <span className="font-bold text-gray-900">{estimatedTime} seconds</span>
        </p>
      </div>

      {/* Buttons for Cancel and Accept */}
      <div className="flex gap-4">
        {/* Cancel Button */}
        <button
          onClick={() => navigate('/cancel')}
          className="px-8 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all shadow-md"
        >
          Cancel Request
        </button>

        {/* Accept Button */}
        <button
          onClick={handleAccept}
          className="px-8 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-all shadow-md"
        >
          Accept & Start Chat
        </button>
      </div>
    </div>
  );
};

export default WaitingForConnection;
