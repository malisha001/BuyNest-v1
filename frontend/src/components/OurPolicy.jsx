import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="my-16 px-4 sm:px-8 md:px-16">
      {/* Title Section */}
      <div className="text-center text-4xl font-bold py-8">
        <h2 className="text-gray-900">OUR POLICIES</h2>
        <p className="w-full md:w-3/4 lg:w-2/4 m-auto text-sm sm:text-base md:text-lg text-gray-600 mt-4">
          Learn more about our policies that ensure the best shopping experience. Customer satisfaction is our priority.
        </p>
      </div>

      {/* Policy Cards Section with Gradient Background */}
      <div className="relative py-8 px-6 bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] rounded-xl shadow-lg overflow-hidden">
        <div className="container mx-auto flex flex-col sm:flex-row justify-around gap-12 text-center">
          
          {/* Policy 1 */}
          <div className="group hover:bg-white shadow-lg rounded-xl p-8 transition-all duration-300 border border-gray-200 hover:border-blue-500">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 opacity-30 blur-lg rounded-full"></div>
              <img 
                src={assets.exchange_icon} 
                className="w-16 m-auto mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110" 
                alt="Exchange Icon" 
              />
            </div>
            <p className="text-xl font-bold text-gray-900 group-hover:text-blue-600">Easy Exchange Policy</p>
            <p className="text-sm text-gray-500 mt-2">
              Enjoy quick and seamless exchanges for all your purchases.
            </p>
          </div>

          {/* Policy 2 */}
          <div className="group hover:bg-white shadow-lg rounded-xl p-8 transition-all duration-300 border border-gray-200 hover:border-blue-500">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 opacity-30 blur-lg rounded-full"></div>
              <img 
                src={assets.quality_icon} 
                className="w-16 m-auto mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110" 
                alt="Return Policy Icon" 
              />
            </div>
            <p className="text-xl font-bold text-gray-900 group-hover:text-blue-600">7 Days Return Policy</p>
            <p className="text-sm text-gray-500 mt-2">
              You have 7 days to return your items for a full refund.
            </p>
          </div>

          {/* Policy 3 */}
          <div className="group hover:bg-white shadow-lg rounded-xl p-8 transition-all duration-300 border border-gray-200 hover:border-blue-500">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 opacity-30 blur-lg rounded-full"></div>
              <img 
                src={assets.support_img} 
                className="w-16 m-auto mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110" 
                alt="Support Icon" 
              />
            </div>
            <p className="text-xl font-bold text-gray-900 group-hover:text-blue-600">24/7 Customer Support</p>
            <p className="text-sm text-gray-500 mt-2">
              We are here to help you at any time, day or night.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
