import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LiveAssistanceStart = () => {
  const navigate = useNavigate();

  // Define keyframe animations as JavaScript objects
  const fadeInDown = {
    animation: 'fadeInDown 1s ease-out',
  };

  const fadeInUp = {
    animation: 'fadeInUp 1s ease-out',
  };

  const bgPulse = {
    animation: 'bgPulse 10s ease infinite',
  };

  // Inline keyframes using @keyframes as objects
  const styles = `
    @keyframes fadeInDown {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes bgPulse {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    .fadeInDown {
      animation: fadeInDown 1s ease-out;
    }

    .fadeInUp {
      animation: fadeInUp 1s ease-out;
    }

    .bgPulse {
      animation: bgPulse 10s ease infinite;
    }
  `;

  const handleStartLiveAssistance = async () => {
    // Get name and email from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { name, email } = userInfo;

    try {
      // Send the name, email, and accept=false to the backend
      const response = await axios.post('http://localhost:4000/api/assist/', {
        name,
        email,
        accept: false, // success state is false when starting assistance
      });
      navigate('/live-wait');
      if (response.data.success) {
        // Navigate to the live waiting screen if the request is successful
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
      {/* Inject keyframes */}
      <style>{styles}</style>

      {/* Background Visuals */}
      <div className="absolute inset-0 w-full h-full bgPulse">
        <div className="w-96 h-96 bg-blue-400 opacity-30 rounded-full absolute -top-10 -left-40 animate-pulse"></div>
        <div className="w-96 h-96 bg-blue-500 opacity-20 rounded-full absolute -bottom-10 -right-40 animate-pulse"></div>
      </div>

      {/* Title with Enhanced Typography */}
      <h1
        className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-800 tracking-wider fadeInDown"
        style={{
          textShadow: '2px 2px 10px rgba(0,0,0,0.15)',
          letterSpacing: '1.5px',
          ...fadeInDown,
        }}
      >
        Live Assistance
      </h1>

      {/* Description */}
      <p
        className="max-w-2xl text-lg md:text-xl mb-10 text-center leading-relaxed text-gray-700 fadeInUp"
        style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.1)', letterSpacing: '0.5px', ...fadeInUp }}
      >
        Get real-time help navigating our website. Click below to start a session now or schedule one at your
        convenience. Our team is ready to assist you with any queries.
      </p>

      {/* Buttons with Advanced Hover Effects */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Start Live Assistance Now Button */}
        <button
          onClick={handleStartLiveAssistance}
          className="w-full md:w-auto px-12 py-4 bg-darkblue-500 text-white rounded-full text-lg font-bold relative overflow-hidden group shadow-lg transition-transform transform hover:scale-105"
          style={{ backgroundColor: '#003366', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
        >
          <span className="absolute inset-0 w-full h-full bg-white opacity-10 transition-all duration-300 transform scale-0 group-hover:scale-150"></span>
          <span className="relative z-10 transition-transform duration-200 group-hover:scale-105">
            Start Live Assistance Now
          </span>
        </button>

        {/* Schedule Session Button */}
        <button
          onClick={() => navigate('/schedule-session')}
          className="w-full md:w-auto px-12 py-4 bg-gray-300 text-gray-800 rounded-full text-lg font-bold relative overflow-hidden group shadow-lg transition-transform transform hover:scale-105"
          style={{ boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' }}
        >
          <span className="absolute inset-0 w-full h-full bg-gray-400 opacity-10 transition-all duration-300 transform scale-0 group-hover:scale-150"></span>
          <span className="relative z-10 transition-transform duration-200 group-hover:scale-105">
            Schedule a Session
          </span>
        </button>
      </div>
    </div>
  );
};

export default LiveAssistanceStart;
