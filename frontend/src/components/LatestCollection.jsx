import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import {getProducts} from '../service/productAndHome';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleContrast = () => setIsHighContrast(!isHighContrast);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="relative py-20 px-6">
      {/* Title and Description Section */}
      <div className='relative text-center py-8 text-4xl font-semibold text-gray-900'>
        <Title text1={'NEW ARRIVALS'} text2={'LATEST COLLECTION'} />
        <p className='w-full md:w-3/4 lg:w-2/4 m-auto text-sm sm:text-base md:text-lg text-gray-600 mt-4'>
          Discover the latest trends in fashion, designed for elegance and sophistication. Perfect for the modern luxury lifestyle.
        </p>
      </div>
      
      {/* High Contrast Toggle Button */}
      <div className="relative flex justify-end mb-4 z-10">
        <button 
          onClick={toggleContrast}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg shadow transition duration-300"
        >
          {isHighContrast ? 'Normal Mode' : 'High Contrast'}
        </button>
      </div>

      {/* Product Section with Different Background */}
      <div className={`relative py-8 px-6 bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] rounded-xl shadow-lg overflow-hidden ${isHighContrast ? 'bg-black text-white' : ''}`}>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8'>
          {
            latestProducts.map((item, index) => (
              <ProductItem 
                key={item._id || index}
                id={item._id} 
                image={item.image} 
                name={item.name} 
                price={item.price} 
                isHighContrast={isHighContrast}  
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
