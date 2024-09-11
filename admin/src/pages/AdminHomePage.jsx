import React from 'react';

const AdminHomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4" style={{ backgroundColor: '#E2E9EC' }}>
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 bg-opacity-50 backdrop-blur-lg border border-gray-200">
                <h1 className="text-2xl font-semibold mb-2 text-gray-800">Welcome, Admin!</h1>
                <p className="text-sm text-gray-500">Here’s a quick overview of your system insights.</p>
            </div>

            {/* Advanced Analytics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-4 bg-opacity-60 backdrop-blur-lg border border-gray-300 transform hover:scale-105 transition-all duration-300">
                    <h2 className="text-lg font-medium mb-1 text-gray-700">Users</h2>
                    <p className="text-3xl font-bold text-gray-900">1,234</p>
                    <p className="text-gray-500 text-xs">Total Users</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 bg-opacity-60 backdrop-blur-lg border border-gray-300 transform hover:scale-105 transition-all duration-300">
                    <h2 className="text-lg font-medium mb-1 text-gray-700">Orders</h2>
                    <p className="text-3xl font-bold text-gray-900">567</p>
                    <p className="text-gray-500 text-xs">New Orders</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 bg-opacity-60 backdrop-blur-lg border border-gray-300 transform hover:scale-105 transition-all duration-300">
                    <h2 className="text-lg font-medium mb-1 text-gray-700">Revenue</h2>
                    <p className="text-3xl font-bold text-gray-900">$12,435</p>
                    <p className="text-gray-500 text-xs">Today's Revenue</p>
                </div>
            </div>

            {/* Live Human Experience Details Section */}
            <div className="bg-white rounded-lg shadow-md p-6 bg-opacity-60 backdrop-blur-lg border border-gray-300">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Live Human Experience Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                        <h3 className="text-base font-medium text-gray-700">Active Users</h3>
                        <p className="text-2xl font-bold text-gray-800">342</p>
                        <p className="text-gray-500 text-xs">Users currently interacting with the platform</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                        <h3 className="text-base font-medium text-gray-700">Average Session Duration</h3>
                        <p className="text-2xl font-bold text-gray-800">15m 34s</p>
                        <p className="text-gray-500 text-xs">Average time users spend on the platform</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                        <h3 className="text-base font-medium text-gray-700">Feedback Score</h3>
                        <p className="text-2xl font-bold text-gray-800">4.7/5</p>
                        <p className="text-gray-500 text-xs">Based on real-time user feedback</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                        <h3 className="text-base font-medium text-gray-700">Most Active Region</h3>
                        <p className="text-2xl font-bold text-gray-800">North America</p>
                        <p className="text-gray-500 text-xs">Region with the highest user activity</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
