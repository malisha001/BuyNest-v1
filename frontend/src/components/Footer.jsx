import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between px-6 sm:px-12">
        
        {/* Logo and About Section */}
        <div className="flex-1 mb-8 sm:mb-0">
          <img src={assets.logo} className="mb-4 w-40" alt="ForeverYou Logo" />
          <p className="text-gray-600">
            At ForeverYou, we bring you premium quality fashion with a commitment to sustainability and timeless style. Discover the best in contemporary and classic fashion with us.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 mb-8 sm:mb-0">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-2">
            <li className="hover:text-gray-900 transition-colors duration-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-900 transition-colors duration-300 cursor-pointer">About Us</li>
            <li className="hover:text-gray-900 transition-colors duration-300 cursor-pointer">Delivery</li>
            <li className="hover:text-gray-900 transition-colors duration-300 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h4>
          <ul className="space-y-2">
            <li className="hover:text-gray-900 transition-colors duration-300">+1-212-456-7890</li>
            <li className="hover:text-gray-900 transition-colors duration-300">contact@foreveryou.com</li>
            <li className="hover:text-gray-900 transition-colors duration-300">123 Fashion Street, New York, USA</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center py-5">
        <p className="text-gray-500 text-sm">
          © 2024 ForeverYou - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
