import React from "react";
import { useNavigate } from "react-router-dom";

const TestOne = () => {
  const navigate = useNavigate();

  const goToNextStep = () => {
    navigate('/test3'); // This navigates to the next step
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full p-8 md:p-12 bg-white shadow-lg rounded-xl flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
        
        {/* Left Section: Title and Description */}
        <section className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Experience Real-Time Assistance
          </h1>
          <h2 className="text-2xl md:text-3xl text-indigo-600 mt-4">
            Live Human Interaction
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-lg leading-relaxed">
            Introducing our **Live Human Experience**, where helpers guide you through the website with verbal descriptions via live voice chat. Enjoy seamless navigation with real-time support.
          </p>
          
          {/* Call to Action Button */}
          <button
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={goToNextStep}
            aria-label="Proceed to the next step"
          >
            Start Your Journey
          </button>
        </section>

        {/* Right Section: Accessibility and Feature Icons */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[{ icon: '🔊', label: 'Live Voice Chat' }, { icon: '🎧', label: 'Real-Time Guidance' }, { icon: '💬', label: 'Voice Commands' }]
          .map(({ icon, label }, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300">
              <div className="text-5xl text-indigo-500 mb-4" aria-hidden="true">
                {icon}
              </div>
              <p className="text-lg font-semibold text-gray-800">{label}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default TestOne;
