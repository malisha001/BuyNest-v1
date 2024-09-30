import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // Icons for voice-over

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, getCartAmount, delivery_fee } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false); // State for voice-over

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

  // Handle voice-over functionality
  const handleVoiceOver = () => {
    if (window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance();
      if (!isSpeaking) {
        // Read each cart item aloud
        let cartDescription = 'Your cart contains: ';
        cartData.forEach(item => {
          const productData = products.find(product => product._id === item._id);
          cartDescription += `${item.quantity} units of ${productData.name}, size ${item.size}. `;
        });
        speech.text = cartDescription;
        window.speechSynthesis.speak(speech);
        setIsSpeaking(true);
      } else {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    } else {
      alert("Your browser doesn't support speech synthesis.");
    }
  };

  useEffect(() => {
    return () => {
      if (isSpeaking) window.speechSynthesis.cancel();
    };
  }, [isSpeaking]);

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <div className='text-center text-2xl'>
          <Title text1={'YOUR'} text2={'CART'} />
        </div>

        {/* Voice Over Button */}
        <button
          onClick={handleVoiceOver}
          className={`p-3 rounded-full shadow-md transition duration-300 transform hover:scale-105 ${
            isSpeaking ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'
          } text-white`}
          aria-label={isSpeaking ? 'Stop Voice Over' : 'Start Voice Over'}
        >
          {isSpeaking ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </button>
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
                  className={`rounded-lg shadow-lg p-4 flex justify-between items-center gap-4 hover:shadow-xl transition-shadow duration-300 bg-white text-gray-800`}
                  aria-label={`Cart item: ${productData.name}, size ${item.size}, quantity ${item.quantity}, price ${currency}${productData.price}`}>
                  
                  {/* Product Image and Info */}
                  <div className='flex items-start gap-6'>
                    <img className='w-20 sm:w-28 rounded-lg' src={productData.image[0]} alt={productData.name} aria-hidden="true" />
                    <div className='flex flex-col justify-between'>
                      <p className='text-lg font-semibold' aria-label={`Product: ${productData.name}`}>{productData.name}</p>
                      {/* Price and Size */}
                      <div className='flex items-center gap-3 mt-1'>
                        <p className='text-xl font-bold text-gray-800' aria-label={`Price: ${currency}${productData.price}`}>
                          {currency} {productData.price}.00
                        </p>
                        <p className='px-3 py-1 border border-gray-300 text-sm bg-gray-100 text-gray-600 rounded-md' aria-label={`Size: ${item.size}`}>
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
                        className={`px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        aria-label="Decrease quantity"
                        aria-controls={`quantity-${index}`}
                      >
                        -
                      </button>
                      <input 
                        id={`quantity-${index}`}
                        aria-label="Quantity"
                        onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                        className='w-12 px-2 py-1 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' 
                        type="number" 
                        min={1} 
                        value={item.quantity} 
                      />
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)} 
                        className={`px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        aria-label="Increase quantity"
                        aria-controls={`quantity-${index}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <img 
                      onClick={() => updateQuantity(item._id, item.size, 0)} 
                      className='w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-300' 
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
        <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className=' w-full text-end'>
          <button 
  onClick={() => navigate('/place-order')} 
  className='bg-[#124271] text-white text-sm my-8 px-8 py-3 rounded-lg shadow-md hover:bg-[#0f365b] transition-colors duration-300 transform hover:scale-105'
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
