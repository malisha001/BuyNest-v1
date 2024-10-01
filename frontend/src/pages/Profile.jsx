import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // Framer Motion for animation
import { ClipLoader } from 'react-spinners';

const Profile = () => {
  // Retrieve user info from local storage
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

  // State for managing profile data
  const [email, setEmail] = useState(storedUserInfo?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // To indicate update request in progress
  const token = storedUserInfo?.token || '';
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Fetch profile data from backend on component mount
  useEffect(() => {
    if (!token) {
      toast.error('User not authenticated.');
    }
  }, [token]);

  // Handle password change submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-50 min-h-screen py-16 px-4 sm:px-10 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50, duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide">
          Profile Settings
        </h1>
        <p className="text-lg text-gray-600 mt-4">Update your password below.</p>
      </motion.div>

      {/* Profile Form Section */}
      <motion.div
        className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto p-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <form onSubmit={handlePasswordChange} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="w-full mt-2 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              placeholder="Your email address"
            />
          </div>

          {/* Current Password */}
          <div className="relative">
            <label
              htmlFor="currentPassword"
              className="block text-lg font-semibold text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              placeholder="Enter your current password"
              required
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-lg font-semibold text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              placeholder="Enter your new password"
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-semibold text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              placeholder="Confirm your new password"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.div
            className="flex justify-end"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md transition duration-300 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={20} color={'#ffffff'} />
              ) : (
                'Change Password'
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
