import React from "react";
import { useNavigate } from "react-router-dom";

const Test3 = () => {
  const navigate = useNavigate();

  const goToOnboardingPage = () => {
    navigate('/taskbar'); // Navigate to next page
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full p-8 md:p-12 bg-white shadow-lg rounded-xl flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
        
        {/* Left Section: Title and Description */}
        <section className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Introducing Voice-Over Support
          </h1>
          <h2 className="text-2xl md:text-3xl text-indigo-600 mt-4">
            Hover and Listen to Product Descriptions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-lg leading-relaxed">
            With our **voice-over feature**, users can hover over products to hear real-time descriptions, providing a seamless shopping experience.
          </p>
          
          {/* Call to Action Button */}
          <button
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={goToOnboardingPage}
            aria-label="Proceed to explore voice-over features"
          >
            Explore Now
          </button>
        </section>

        {/* Right Section: Visual Demo of Voice-Over */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[{ icon: '🔊', label: 'Live Product Description' }, { icon: '🎤', label: 'Voice Feedback' }]
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

export default Test3;
