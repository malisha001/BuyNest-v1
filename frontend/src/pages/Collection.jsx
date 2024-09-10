import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='py-10 px-6'>
      <div className='container mx-auto flex flex-col sm:flex-row gap-6'>
        
        {/* Filter Options */}
        <div className='w-full sm:w-1/4'>
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className='my-2 text-xl flex items-center cursor-pointer gap-2 text-gray-800 font-semibold'
            aria-expanded={showFilter}
            aria-controls="filter-options"
          >
            FILTERS
            <img className={`h-4 transform transition-transform ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="Dropdown Icon" />
          </button>
          <div id="filter-options" className={`border border-gray-300 rounded-lg p-4 mt-6 bg-white shadow-md ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-lg font-semibold text-gray-800'>CATEGORIES</p>
            <div className='flex flex-col gap-2'>
              <label className='flex items-center gap-2 text-gray-700'>
                <input 
                  className='w-5 h-5 border-gray-300 rounded' 
                  type="checkbox" 
                  value={'Men'} 
                  onChange={toggleCategory} 
                  aria-label="Men" 
                />
                Men
              </label>
              <label className='flex items-center gap-2 text-gray-700'>
                <input 
                  className='w-5 h-5 border-gray-300 rounded' 
                  type="checkbox" 
                  value={'Women'} 
                  onChange={toggleCategory} 
                  aria-label="Women" 
                />
                Women
              </label>
              <label className='flex items-center gap-2 text-gray-700'>
                <input 
                  className='w-5 h-5 border-gray-300 rounded' 
                  type="checkbox" 
                  value={'Kids'} 
                  onChange={toggleCategory} 
                  aria-label="Kids" 
                />
                Kids
              </label>
            </div>
          </div>
          <div className={`border border-gray-300 rounded-lg p-4 my-5 bg-white shadow-md ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-lg font-semibold text-gray-800'>TYPE</p>
            <div className='flex flex-col gap-2'>
              <label className='flex items-center gap-2 text-gray-700'>
                <input 
                  className='w-5 h-5 border-gray-300 rounded' 
                  type="checkbox" 
                  value={'Topwear'} 
                  onChange={toggleSubCategory} 
                  aria-label="Topwear" 
                />
                Topwear
              </label>
              <label className='flex items-center gap-2 text-gray-700'>
                <input 
                  className='w-5 h-5 border-gray-300 rounded' 
                  type="checkbox" 
                  value={'Bottomwear'} 
                  onChange={toggleSubCategory} 
                  aria-label="Bottomwear" 
                />
                Bottomwear
              </label>
              <label className='flex items-center gap-2 text-gray-700'>
                <input 
                  className='w-5 h-5 border-gray-300 rounded' 
                  type="checkbox" 
                  value={'Winterwear'} 
                  onChange={toggleSubCategory} 
                  aria-label="Winterwear" 
                />
                Winterwear
              </label>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1'>
          <div className='flex justify-between items-center mb-6'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            <select 
              onChange={(e) => setSortType(e.target.value)} 
              className='border-2 border-gray-300 text-lg px-4 py-2 rounded-lg bg-white shadow-md'
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Product Card Area with Background Style */}
          <div className='bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6 rounded-xl shadow-lg'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Collection;
