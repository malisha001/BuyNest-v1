import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets'; // Ensure assets are imported correctly

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll listener for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex flex-col sm:flex-row overflow-hidden h-[85vh] relative">
      {/* Left Section with Enhanced Content */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-12 sm:py-20 bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] relative">
        <div className='text-center px-10 sm:px-16'>

          {/* Upper Tagline with Divider */}
          <div className='flex flex-col items-center gap-2 mb-4'>
            <p className='font-semibold text-lg md:text-xl text-gray-500 tracking-wider uppercase serif italic fade-in'>
              Discover the New
            </p>
            <div className='w-16 h-[1px] bg-gray-700 mt-1 mb-3'></div> {/* Thin line divider */}
          </div>

          {/* Main Heading with Animation */}
          <h1 className='font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 tracking-wide fade-in-slow text-gray-900'>
            Latest Arrivals
          </h1>

          {/* Subtext/Description */}
          <p className='leading-relaxed mb-8 fade-in text-base md:text-lg text-gray-600'>
            Explore the new collection of elegant designs, where fashion meets comfort. Discover exclusive styles for this season.
          </p>

          {/* Call to Action Button */}
          <a href="#shop-now" aria-label="Shop Now" className="inline-flex items-center gap-4 py-3 px-8 border border-gray-800 font-medium text-sm md:text-base rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 glow-on-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
            <span>SHOP NOW</span>
            <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>

          {/* Subtle USP Section */}
          <div className='mt-6 text-sm fade-in flex flex-col items-center'>
            <p className='text-gray-500'>Free shipping on orders over $100</p>
            <div className='flex items-center gap-2 mt-3'>
              <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v6m0 0l-4-4m4 4l4-4m-4 4v6" />
              </svg>
              <p className='text-gray-500'>Free returns on all orders</p>
            </div>
            <div className='flex items-center gap-2 mt-3'>
              <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m0-8l-4 4m4-4l4 4" />
              </svg>
              <p className='text-gray-500'>30-day satisfaction guarantee</p>
            </div>
          </div>

        </div>
      </div>

      {/* Right Section with Parallax Effect */}
      <div className='w-full sm:w-1/2 relative overflow-hidden'>
        {/* Background Image with Alt Text and Parallax */}
        <img 
          className='w-full h-full object-cover object-top parallax' 
          src={assets.hero_img} 
          alt="A stylish display of our latest fashion arrivals" 
          style={{
            transform: `translateY(${scrollPosition * 0.2}px)`, // Parallax effect
            transition: 'transform 0.1s ease-out'
          }}
        />

        {/* Image Overlay for better readability */}
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40'></div>
      </div>
    </div>
  );
};

export default Hero;
