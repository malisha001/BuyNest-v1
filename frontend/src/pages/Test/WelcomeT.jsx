import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeT = () => {
  const navigate = useNavigate();

  const goToNextStep = () => {
    navigate('/test1'); // This navigates to the next step
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full p-8 md:p-12 bg-white shadow-lg rounded-xl flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
        
        {/* Left Section: Title and Description */}
        <section className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Compare Prices
          </h1>
          <h2 className="text-2xl md:text-3xl text-indigo-600 mt-4">
            And Save Big
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-lg leading-relaxed">
            BuyNest helps you find the best prices, compare products, and make smarter shopping decisions. Let’s start your shopping journey now!
          </p>
          <button
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={goToNextStep}
            aria-label="Proceed to price comparison"
          >
            Start Saving
          </button>
        </section>

        {/* Right Section: Image/Visual */}
        <section className="flex-1 flex justify-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c519ca0d099ee3900cb8ecfb97b6052378a55a68a2b1fca09a31ffb25baa148?placeholderIfAbsent=true&apiKey=4ab5310948d94fbeb13af5fdd28cfb2e"
            className="rounded-lg shadow-lg object-cover w-full border-2 border-gray-200"
            alt="Illustration of compare and save feature"
          />
        </section>
      </div>
    </main>
  );
};

export default WelcomeT;
