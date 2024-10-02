import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  // Frontend validation function
  const validateInputs = () => {
    if (updatedName.trim() === '') {
      toast.error('Product name cannot be empty.');
      return false;
    }

    if (!updatedPrice || isNaN(updatedPrice) || updatedPrice <= 0) {
      toast.error('Please enter a valid price greater than zero.');
      return false;
    }

    if (!['Men', 'Women', 'Kids'].includes(updatedCategory)) {
      toast.error('Please select a valid category.');
      return false;
    }

    if (updatedSizes.length === 0) {
      toast.error('Please select at least one size.');
      return false;
    }

    return true;
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    // Check inputs before submitting
    if (!validateInputs()) return;

    try {
      const updatedData = {
        id: selectedProduct._id,
        name: updatedName,
        price: updatedPrice,
        category: updatedCategory,
        sizes: updatedSizes,
      };

      const response = await axios.post(backendUrl + '/api/product/update', updatedData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Product updated successfully");
        await fetchList();
        closeModal();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Add "Forever" as a centered logo or title
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('Forever', 105, 20, { align: 'center' });

    // Add a separator line under the logo
    doc.setLineWidth(0.5);
    doc.line(15, 25, 195, 25);

    // Report title and date
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Product List Report', 105, 35, { align: 'center' });

    doc.setFontSize(12);
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 15, 45);
    doc.text(`Total Products: ${list.length}`, 15, 52);

    // Adding extra line break for spacing
    doc.line(15, 55, 195, 55);

    // Define the table headers
    const tableColumn = ['Name', 'Category', 'Price (LKR)', 'Available Sizes'];

    // Initialize the rows for the table
    const tableRows = [];

    list.forEach((item) => {
        const productData = [
            item.name,
            item.category,
            `${currency}${item.price.toFixed(2)}`, // Price formatted to 2 decimal places
            item.sizes ? item.sizes.join(", ") : "N/A",
        ];
        tableRows.push(productData);
    });

    // Generate the table
    doc.autoTable({
        startY: 60,  // Start below the title and info
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',  // A clean grid theme
        headStyles: { fillColor: [22, 160, 133], textColor: 255 }, // Elegant header colors
        styles: { fontSize: 10, halign: 'center' },
        columnStyles: {
            0: { halign: 'left' },  // Align name to the left
            2: { halign: 'right' }  // Align prices to the right
        }
    });

    // Add a footer
    const finalY = doc.autoTable.previous.finalY + 10;  // Position footer after table
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("This report was generated automatically by Forever's system.", 105, finalY, { align: 'center' });
    doc.text("For more details, visit our website or contact us at info@forever.com", 105, finalY + 6, { align: 'center' });

    // Save the PDF
    doc.save(`Product_List_Report_${date}.pdf`);
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold text-gray-800">All Products List</p>
        <button
          className="px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: '#124271' }}
          onClick={generateReport}
        >
          Generate Report
        </button>
      </div>
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
                  min="0.01" // Ensure price cannot be less than 0.01
                  step="0.01" // Allows decimal input
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (value >= 0) {
                      setUpdatedPrice(e.target.value);
                    } else {
                      toast.error("Price cannot be less than zero.");
                    }
                  }}
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
