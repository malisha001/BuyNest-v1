import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate } = useContext(ShopContext);

    return (
        <div className="container mx-auto py-12 px-6 lg:px-20">
            <div className="flex flex-col lg:flex-row justify-between gap-16">
                
                {/* Delivery Information Section */}
                <div className="flex-1 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-3xl shadow-lg p-10 transition-all">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />

                    {/* Form for Delivery Information */}
                    <form className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input 
                                className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all"
                                type="text" placeholder="First name"
                            />
                            <input 
                                className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all"
                                type="text" placeholder="Last name"
                            />
                        </div>
                        <input 
                            className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all" 
                            type="email" placeholder="Email address" 
                        />
                        <input 
                            className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all" 
                            type="text" placeholder="Street address" 
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input 
                                className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all"
                                type="text" placeholder="City"
                            />
                            <input 
                                className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all"
                                type="text" placeholder="State"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input 
                                className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all"
                                type="number" placeholder="Zipcode"
                            />
                            <input 
                                className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all"
                                type="text" placeholder="Country"
                            />
                        </div>
                        <input 
                            className="border border-gray-300 rounded-lg py-4 px-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 transition-all"
                            type="text" placeholder="Phone number"
                        />
                    </form>
                </div>

                {/* Cart Total and Payment Section */}
                <div className="flex-1 space-y-8">
                    
                    {/* Cart Summary Section */}
                    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-3xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">CART TOTALS</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between text-lg font-medium">
                                <p className="text-gray-600">Subtotal</p>
                                <p className="text-gray-800">$870.00</p>
                            </div>
                            <div className="flex justify-between text-lg font-medium">
                                <p className="text-gray-600">Shipping Fee</p>
                                <p className="text-gray-800">$10.00</p>
                            </div>
                            <div className="flex justify-between text-xl font-bold">
                                <p className="text-gray-800">Total</p>
                                <p className="text-gray-900">$880.00</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-3xl shadow-lg p-8">
                        <Title text1={'PAYMENT'} text2={'METHOD'} />

                        {/* Payment Options */}
                        <div className="mt-6 space-y-4">
                            <div 
                                onClick={() => setMethod('stripe')}
                                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-shadow duration-300 ${
                                    method === 'stripe' ? 'border-blue-600 shadow-md' : 'border-gray-200'
                                } hover:shadow-lg`}
                            >
                                <div className="flex items-center gap-4">
                                    <span 
                                        className={`w-5 h-5 border-2 rounded-full ${
                                            method === 'stripe' ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
                                        }`}
                                    />
                                    <img className="h-6" src={assets.stripe_logo} alt="Stripe Payment" />
                                </div>
                            </div>

                            <div 
                                onClick={() => setMethod('cod')}
                                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-shadow duration-300 ${
                                    method === 'cod' ? 'border-blue-600 shadow-md' : 'border-gray-200'
                                } hover:shadow-lg`}
                            >
                                <div className="flex items-center gap-4">
                                    <span 
                                        className={`w-5 h-5 border-2 rounded-full ${
                                            method === 'cod' ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
                                        }`}
                                    />
                                    <p className="text-gray-700 font-medium">Cash on Delivery</p>
                                </div>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="w-full text-center mt-8">
                            <button 
                                onClick={() => navigate('/orders')}
                                className="bg-blue-900 text-white py-4 w-full rounded-lg font-semibold text-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all">
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
