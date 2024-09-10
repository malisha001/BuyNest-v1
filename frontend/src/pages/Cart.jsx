import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isHighContrast, setIsHighContrast] = useState(false); // For visually impaired users

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Toggle high contrast mode
  const toggleContrast = () => setIsHighContrast(!isHighContrast);

  return (
    <div className="container mx-auto py-10 px-6">
      {/* High Contrast Toggle Button */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={toggleContrast} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-pressed={isHighContrast ? "true" : "false"}
          aria-label="Toggle high contrast mode"
        >
          {isHighContrast ? 'Normal Mode' : 'High Contrast Mode'}
        </button>
      </div>

      <div className='text-center text-2xl mb-10'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Cart Items Section */}
        <div className={`flex-1 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl shadow-md p-6`}>
          <div className='space-y-4'>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div 
                  key={index} 
                  className={`rounded-lg shadow-lg p-4 flex justify-between items-center gap-4 hover:shadow-xl transition-shadow duration-300 ${isHighContrast ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                  aria-label={`Cart item: ${productData.name}, size ${item.size}, quantity ${item.quantity}, price ${currency}${productData.price}`}>
                  
                  {/* Product Image and Info */}
                  <div className='flex items-start gap-6'>
                    <img className='w-20 sm:w-28 rounded-lg' src={productData.image[0]} alt={productData.name} aria-hidden="true" />
                    <div className='flex flex-col justify-between'>
                      <p className='text-lg font-semibold' aria-label={`Product: ${productData.name}`}>{productData.name}</p>
                      {/* Price and Size */}
                      <div className='flex items-center gap-3 mt-1'>
                        <p className={`text-xl font-bold ${isHighContrast ? 'text-white' : 'text-gray-800'}`} aria-label={`Price: ${currency}${productData.price}`}>
                          {currency}{productData.price}
                        </p>
                        <p className={`px-3 py-1 border border-gray-300 text-sm ${isHighContrast ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'} rounded-md`} aria-label={`Size: ${item.size}`}>
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className='flex items-center gap-6'>
                    {/* Quantity Controls */}
                    <div className='flex items-center border border-gray-300 rounded-md'>
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)} 
                        className={`px-3 py-1 ${isHighContrast ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        aria-label="Decrease quantity"
                        aria-controls={`quantity-${index}`}
                      >
                        -
                      </button>
                      <input 
                        id={`quantity-${index}`}
                        aria-label="Quantity"
                        onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                        className={`w-12 px-2 py-1 text-center ${isHighContrast ? 'text-white bg-gray-800' : 'text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`} 
                        type="number" 
                        min={1} 
                        value={item.quantity} 
                      />
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)} 
                        className={`px-3 py-1 ${isHighContrast ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        aria-label="Increase quantity"
                        aria-controls={`quantity-${index}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <img 
                      onClick={() => updateQuantity(item._id, item.size, 0)} 
                      className={`w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-300 ${isHighContrast ? 'filter invert' : ''}`} 
                      src={assets.bin_icon} 
                      alt="Remove item"
                      aria-label={`Remove ${productData.name}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Total Section */}
        <div className='lg:w-1/3 lg:flex lg:items-center'>
          <div className='sticky top-20 self-start w-full'>
            <div className={`bg-gray-100 rounded-xl shadow-md p-6 ${isHighContrast ? 'bg-black text-black' : ''}`}>
              <h2 className={`text-lg font-bold mb-4 ${isHighContrast ? 'text-black' : 'text-gray-800'}`}>CART TOTALS</h2>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <p className={`${isHighContrast ? 'text-black' : 'text-gray-600'}`}>Subtotal</p>
                  <p className={`${isHighContrast ? 'text-black' : 'text-gray-800'}`}>$870.00</p>
                </div>
                <div className='flex justify-between'>
                  <p className={`${isHighContrast ? 'text-black' : 'text-gray-600'}`}>Shipping Fee</p>
                  <p className={`${isHighContrast ? 'text-black' : 'text-gray-800'}`}>$10.00</p>
                </div>
                <div className='flex justify-between font-bold'>
                  <p className={`${isHighContrast ? 'text-black' : 'text-gray-800'}`}>Total</p>
                  <p className={`${isHighContrast ? 'text-black' : 'text-gray-800'}`}>$880.00</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/place-order')} 
                className='w-full bg-black text-white text-sm font-semibold py-3 px-8 rounded-lg mt-6 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                aria-label="Proceed to checkout"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
