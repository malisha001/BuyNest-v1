import React from 'react';
import { FaPlus, FaList, FaBox, FaUserFriends, FaUsers, FaTags, FaStore } from 'react-icons/fa'; // Icons for sidebar items

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg rounded-lg p-6 bg-opacity-60 backdrop-blur-lg border border-gray-200">
            {/* Sidebar Items */}
            <ul className="space-y-6">
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaPlus className="text-gray-700" />
                    <a href="/add" className="text-gray-800 font-semibold text-base">Add Items</a>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaList className="text-gray-700" />
                    <a href="/list" className="text-gray-800 font-semibold text-base">List Items</a>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaBox className="text-gray-700" />
                    <a href="/orders" className="text-gray-800 font-semibold text-base">Orders</a>
                </li>

                {/* New Sections */}
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaUserFriends className="text-gray-700" />
                    <a href="/" className="text-gray-800 font-semibold text-base">Helper Management</a>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaUsers className="text-gray-700" />
                    <a href="/" className="text-gray-800 font-semibold text-base">Live Human Management</a>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaTags className="text-gray-700" />
                    <a href="/" className="text-gray-800 font-semibold text-base">Category Management</a>
                </li>
                <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
                    <FaStore className="text-gray-700" />
                    <a href="/" className="text-gray-800 font-semibold text-base">Department Store Management</a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
