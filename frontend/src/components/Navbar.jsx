import React, { useContext, useEffect, useState, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import useSpeechToText from '../hooks/useSpeechToText';

const Navbar = () => {
  // States for visibility, contrast mode, and voice recognition
  const [visible, setVisible] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  // Voice recognition
  const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const command = transcript.trim().toLowerCase();
    console.log(command);

    if (command === 'logout') {
      navigate('/login');
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      setToken('');
      setCartItems({});
    }
  }, [transcript, navigate, setToken, setCartItems]);

  const toggleContrast = () => setIsHighContrast(!isHighContrast);

  // Ref for the navbar to get its height dynamically
  const navbarRef = useRef(null);

  useEffect(() => {
    const navbarHeight = navbarRef.current.getBoundingClientRect().height;
    document.body.style.paddingTop = `${navbarHeight}px`;

    return () => {
      document.body.style.paddingTop = '0px';
    };
  }, []);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  // Check if the user is logged in by checking if there is a token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 border border-transparent rounded-md backdrop-blur-lg shadow-lg ${
        isHighContrast ? 'bg-black text-white text-xl' : 'bg-lightblue-100 text-base text-gray-700'
      }`}
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: isHighContrast ? 'rgba(0, 0, 0, 0.85)' : 'rgba(224, 247, 250, 0.3)',
      }}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-4 font-medium">
        {/* Logo */}
        <Link to="/" aria-label="Homepage">
          <img src={assets.logo} className="w-36" alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <ul className={`hidden sm:flex gap-8 tracking-wider ${isHighContrast ? 'text-white font-bold' : 'text-gray-700'}`}>
          <NavLink
            to="/"
            className="relative flex flex-col items-center gap-1 group"
            activeClassName="active-link"
            aria-label="Home"
            style={({ isActive }) => ({
              borderBottom: isActive ? '3px solid #333' : 'none',
              paddingBottom: isActive ? '5px' : 'none',
            })}
          >
            <p>HOME</p>
          </NavLink>
          <NavLink
            to="/collection"
            className="relative flex flex-col items-center gap-1 group"
            activeClassName="active-link"
            aria-label="Collection"
            style={({ isActive }) => ({
              borderBottom: isActive ? '3px solid #333' : 'none',
              paddingBottom: isActive ? '5px' : 'none',
            })}
          >
            <p>COLLECTION</p>
          </NavLink>
          <NavLink
            to="/about"
            className="relative flex flex-col items-center gap-1 group"
            activeClassName="active-link"
            aria-label="About Us"
            style={({ isActive }) => ({
              borderBottom: isActive ? '3px solid #333' : 'none',
              paddingBottom: isActive ? '5px' : 'none',
            })}
          >
            <p>ABOUT</p>
          </NavLink>
          <NavLink
            to="/contact"
            className="relative flex flex-col items-center gap-1 group"
            activeClassName="active-link"
            aria-label="Contact"
            style={({ isActive }) => ({
              borderBottom: isActive ? '3px solid #333' : 'none',
              paddingBottom: isActive ? '5px' : 'none',
            })}
          >
            <p>CONTACT</p>
          </NavLink>
          <NavLink
            to="/accessibility"
            className="relative flex flex-col items-center gap-1 group"
            activeClassName="active-link"
            aria-label="Accessibility"
            style={({ isActive }) => ({
              borderBottom: isActive ? '3px solid #333' : 'none',
              paddingBottom: isActive ? '5px' : 'none',
            })}
          >
            <p>ACCESSIBILITY</p>
          </NavLink>
        </ul>

        {/* Right-side icons */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className={`w-6 cursor-pointer hover:opacity-70 transition-opacity duration-300 ${
              isHighContrast ? 'filter invert' : ''
            }`}
            alt="Search"
            aria-label="Search"
          />

          {/* Profile with Dropdown */}
          <div className="relative">
            <img
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
              className={`w-6 cursor-pointer ${isHighContrast ? 'filter invert' : ''}`}
              src={assets.profile_icon}
              alt="Profile"
              aria-label="Profile"
            />
            {isDropdownOpen && token && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg text-gray-600">
                <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => navigate('/profile')}>My Profile</p>
                <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => navigate('/orders')}>Orders</p>
                <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={logout}>Logout</p>
              </div>
            )}
          </div>

          {/* Cart Icon with Item Count */}
          <Link to="/cart" className="relative" aria-label="Cart">
            <img
              src={assets.cart_icon}
              className={`w-6 cursor-pointer hover:opacity-70 transition-opacity duration-300 ${
                isHighContrast ? 'filter invert' : ''
              }`}
              alt="Cart"
            />
            <p className="absolute right-[-10px] bottom-[-10px] w-5 h-5 text-center leading-5 bg-black text-white text-xs rounded-full">
              {getCartCount()}
            </p>
          </Link>

          {/* Show Login Button if not logged in, otherwise High Contrast Mode Toggle */}
          {isLoggedIn ? (
            <button
              onClick={toggleContrast}
              className={`p-2 bg-gray-200 rounded-full text-sm ${
                isHighContrast ? 'text-white bg-black' : 'text-gray-800'
              } hover:bg-gray-300`}
              aria-label="Toggle High Contrast Mode"
            >
              {isHighContrast ? 'Normal Mode' : 'High Contrast'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="p-2 bg-gray-200 rounded-full text-sm text-gray-800 hover:bg-gray-300"
              aria-label="Login"
            >
              Login
            </button>
          )}

          {/* Voice Recognition Button */}
          <button
            onClick={() => navigate('/live-start')}
            className="px-4 py-2 bg-darkblue-500 text-white rounded-full text-sm font-bold transition-all transform hover:scale-105 hover:shadow-lg focus:outline-none animate-pulse glow-border"
            style={{ backgroundColor: '#003366' }} // Dark Blue
            aria-label="Live Assistance"
          >
            Live Assistance
          </button>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className={`w-6 cursor-pointer sm:hidden ${isHighContrast ? 'filter invert' : ''}`}
            alt="Menu"
            aria-label="Menu"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white transition-all ${
          visible ? 'w-full sm:w-1/2' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col p-6 text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 mb-6 cursor-pointer">
            <img
              className={`h-4 rotate-180 ${isHighContrast ? 'filter invert' : ''}`}
              src={assets.dropdown_icon}
              alt="Back"
              aria-label="Back"
            />
            <p className="text-gray-700">Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className={`py-2 border-b border-gray-200 text-lg ${
              isHighContrast ? 'text-white font-bold text-xl' : 'text-gray-600 text-base'
            }`}
            to="/"
            aria-label="Home"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={`py-2 border-b border-gray-200 text-lg ${
              isHighContrast ? 'text-white font-bold text-xl' : 'text-gray-600 text-base'
            }`}
            to="/collection"
            aria-label="Collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={`py-2 border-b border-gray-200 text-lg ${
              isHighContrast ? 'text-white font-bold text-xl' : 'text-gray-600 text-base'
            }`}
            to="/about"
            aria-label="About Us"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={`py-2 border-b border-gray-200 text-lg ${
              isHighContrast ? 'text-white font-bold text-xl' : 'text-gray-600 text-base'
            }`}
            to="/contact"
            aria-label="Contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
