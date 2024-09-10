import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-16 px-4 sm:px-8 md:px-16">
      {/* Title Section */}
      <div className="text-center text-4xl font-bold py-8">
        <Title text1={'TOP'} text2={'BESTSELLERS'} />
        <p className="w-full md:w-3/4 lg:w-2/4 m-auto text-sm sm:text-base md:text-lg text-gray-600 mt-4">
          These are the top-rated products our customers love. Discover bestsellers that combine style, comfort, and quality.
        </p>
      </div>

      {/* Product Grid with Custom Background */}
      <div className="relative py-8 px-6 bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
          {bestSeller.map((item, index) => (
            <ProductItem
              key={item._id || index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
