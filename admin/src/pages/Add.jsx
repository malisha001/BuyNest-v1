import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(""); // State for validation error message
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Function to handle name input change and validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces

    if (regex.test(value)) {
      setName(value);
      setNameError(""); // Clear error if valid
    } else {
      setNameError("Only letters are allowed in the product name.");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // If there's a name error, prevent form submission
    if (nameError) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-8 p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto' style={{ backgroundColor: '#E2E9EC' }}>
      
      <div className='w-full'>
        <p className='mb-3 font-semibold text-gray-700 text-lg'>Upload Images</p>
        <div className='flex gap-4'>
          {[image1, image2, image3, image4].map((image, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`} className='cursor-pointer w-24 h-24 border border-gray-300 rounded-lg overflow-hidden flex justify-center items-center hover:shadow-md transition'>
              <img className='object-cover w-full h-full' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
              <input onChange={(e) => [setImage1, setImage2, setImage3, setImage4][idx](e.target.files[0])} type="file" id={`image${idx + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2 font-semibold text-gray-700 text-lg'>Product Name</p>
        <input 
          onChange={handleNameChange} 
          value={name} 
          className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition' 
          type="text" 
          placeholder='Enter product name' 
          required 
        />
        {nameError && <p className='text-red-500 text-sm'>{nameError}</p>}
      </div>

      <div className='w-full'>
        <p className='mb-2 font-semibold text-gray-700 text-lg'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition' placeholder='Enter product description' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-6 w-full'>
        <div className='w-full'>
          <p className='mb-2 font-semibold text-gray-700 text-lg'>Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='w-full'>
          <p className='mb-2 font-semibold text-gray-700 text-lg'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className='w-full'>
  <p className='mb-2 font-semibold text-gray-700 text-lg'>Price ($)</p>
  <input 
    onChange={(e) => setPrice(e.target.value)} 
    value={price} 
    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition' 
    type="number" 
    placeholder='Enter price' 
    min="0"  // Set the minimum value to 0
    required 
  />
</div>

      </div>

      <div className='w-full'>
        <p className='mb-2 font-semibold text-gray-700 text-lg'>Available Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-blue-100" : "bg-gray-200"} px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-200 transition`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='cursor-pointer' />
        <label className='cursor-pointer font-semibold text-gray-700' htmlFor="bestseller">Mark as Bestseller</label>
      </div>

      <button type="submit" className='w-40 py-3 mt-6 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition transform hover:scale-105'>Add Product</button>
    </form>
  );
};

export default Add;
