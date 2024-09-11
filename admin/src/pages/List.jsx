import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedSizes, setUpdatedSizes] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdatedName(product.name);
    setUpdatedPrice(product.price);
    setUpdatedCategory(product.category);
    setUpdatedSizes(product.sizes || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const toggleSize = (size) => {
    setUpdatedSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;
  
    try {
      const updatedData = {
        id: selectedProduct._id,  // Include the product ID here
        name: updatedName,
        price: updatedPrice,
        category: updatedCategory,
        sizes: updatedSizes,
      };
  
      const response = await axios.post(backendUrl + '/api/product/update', updatedData, { 
        headers: { token },  // Include the token in the headers if required
      });
  
      if (response.data.success) {
        toast.success("Product updated successfully");
        await fetchList();  // Refresh the list after update
        closeModal();  // Close the modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="text-2xl font-semibold text-gray-800 mb-4">All Products List</p>
      <div className="flex flex-col gap-4">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 border-b bg-gray-100 text-gray-700 text-base rounded-lg shadow-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Update</b>
          <b className="text-center">Delete</b>
        </div>

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300"
            key={index}
            style={{ backgroundColor: '#E2E9EC' }}
          >
            <img className="w-16 h-16 object-cover rounded-lg" src={item.image[0]} alt={item.name} />
            <p className="text-gray-800">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-gray-800">
              {currency}
              {item.price}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => openUpdateModal(item)}
                className="px-4 py-2"
                style={{ backgroundColor: '#0c343d', color: 'white' }}
              >
                Update
              </button>
            </div>

            <div className="flex justify-center">
              <p
                onClick={() => removeProduct(item._id)}
                className="cursor-pointer text-lg text-red-600 hover:text-red-800 transition"
              >
                X
              </p>
            </div>
          </div>
        ))}

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-6">Update Product</h2>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Product Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Product Price</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Category</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200"
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Available Sizes</label>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <div
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`${
                        updatedSizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      } px-4 py-2 rounded-lg cursor-pointer transition`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
