import { useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price, isHighContrast }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className={`group block relative p-4 rounded-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-4 ${
        isHighContrast
          ? 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-yellow-400'
          : 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-300'
      } shadow-md hover:shadow-lg hover:-translate-y-1 transform`}
      to={`/product/${id}`}
      aria-label={`View product details of ${name}`}
      tabIndex={0}
    >
      {/* Image Section (No hover effect on image) */}
      <div className='relative overflow-hidden rounded-lg'>
        <img
          className='w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105'
          src={image[0]}
          alt={name || 'Product Image'}
        />
      </div>

      {/* Text Section */}
      <div className='mt-4'>
        <p
          className={`text-lg font-semibold transition-colors duration-300 ${
            isHighContrast
              ? 'text-white'
              : 'group-hover:text-blue-600 text-black'
          }`}
          style={{ fontSize: isHighContrast ? '1.2rem' : '1rem' }}
        >
          {name}
        </p>
        <p
          className={`text-md font-medium ${
            isHighContrast ? 'text-gray-300' : 'text-gray-800'
          }`}
        >
          {currency}  {price}.00
        </p>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
    </Link>
  );
};

export default ProductItem;
