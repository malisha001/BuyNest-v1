import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LiveAssistanceStart = () => {
  const navigate = useNavigate();

  // Function to handle starting live assistance
  const handleStartLiveAssistance = async () => {
    // Retrieve user information from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.id) {  // Use 'id' instead of 'userId'
      console.error("User information or ID not found. Ensure the user is logged in.");
      return; // Stop the process if 'id' is missing
    }

    const { id: userId, name, email } = userInfo; // Extract 'id' as 'userId'

    try {
      // Send userId, name, and email to the backend to request assistance
      const response = await axios.post('http://localhost:4000/api/assist', {
        userId,   // Use 'userId' (which is 'id' from localStorage)
        name,      // Pass the name
        email,     // Pass the email
        accept: false  // Initially, the request is not accepted (default)
      });

      if (response.data.success) {
        // If successful, navigate to the live-waiting page
        navigate('/live-wait');
      } else {
        console.error('Failed to start live assistance:', response.data.message);
      }
    } catch (error) {
      console.error('Error starting live assistance:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden bg-gradient-to-br from-lightblue-100 to-blue-300 text-gray-800"
      style={{
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Background Visuals */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-96 h-96 bg-blue-400 opacity-30 rounded-full absolute -top-10 -left-40 animate-pulse"></div>
        <div className="w-96 h-96 bg-blue-500 opacity-20 rounded-full absolute -bottom-10 -right-40 animate-pulse"></div>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-800 tracking-wider">
        Live Assistance
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-lg md:text-xl mb-10 text-center leading-relaxed text-gray-700">
        Get real-time help navigating our website. Click below to start a session now or schedule one at your convenience. Our team is ready to assist you with any queries.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Start Live Assistance Now Button */}
        <button
          onClick={handleStartLiveAssistance}
          className="w-full md:w-auto px-12 py-4 bg-darkblue-500 text-white rounded-full text-lg font-bold relative overflow-hidden group shadow-lg transition-transform transform hover:scale-105"
          style={{ backgroundColor: '#003366', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
        >
          Start Live Assistance Now
        </button>

        {/* Schedule Session Button */}
        <button
          onClick={() => navigate('/schedule-session')}
          className="w-full md:w-auto px-12 py-4 bg-gray-300 text-gray-800 rounded-full text-lg font-bold relative overflow-hidden group shadow-lg transition-transform transform hover:scale-105"
          style={{ boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' }}
        >
          Schedule a Session
        </button>
      </div>
    </div>
  );
};

export default LiveAssistanceStart;
