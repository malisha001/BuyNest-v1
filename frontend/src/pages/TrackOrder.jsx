import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; 
import axios from 'axios';

const TrackOrder = () => {
  const { token, backendUrl, addToCart } = useContext(ShopContext); 
  const { orderId } = useParams(); 
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({}); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [currentItemId, setCurrentItemId] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(''); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!token) {
        setError('You need to be logged in to track orders');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/order/track-order`, 
          { orderId },
          { headers: { token } }
        );
        
        if (response.data.success) {
          setOrderDetails(response.data.order); 
        } else {
          setError(response.data.message); 
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('An error occurred while fetching the order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails(); 
  }, [token, orderId, backendUrl]);

  const getStatusProgress = (status) => {
    const statusMap = {
      'Order Placed': 1,
      'Processing': 2,
      'Shipped': 3,
      'Delivered': 4
    };
    return statusMap[status] || 1;
  };

  const handleCancelRequest = () => {
    alert("Cancel request sent!");
  };

  const handleReorder = () => {
    if (orderDetails && orderDetails.items) {
      let itemsNeedingSize = orderDetails.items.filter(item => item.sizes && !selectedSizes[item._id]);
      
      if (itemsNeedingSize.length > 0) {
        setCurrentItemId(itemsNeedingSize[0]._id);
        setIsPopupOpen(true);
      } else {
        orderDetails.items.forEach((item) => {
          const selectedSize = selectedSizes[item._id] || (item.sizes && item.sizes.length > 0 ? "S" : null);

          if (selectedSize) {
            addToCart(item._id, selectedSize); 
          }
        });
        alert("Items have been added to your cart!");
      }
    } else {
      alert("No items found to reorder.");
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size); 
  };

  const handleApplySizeSelection = () => {
    setSelectedSizes((prev) => ({ ...prev, [currentItemId]: selectedSize }));
    setIsPopupOpen(false); 

    let remainingItems = orderDetails.items.filter(item => item.sizes && !selectedSizes[item._id] && item._id !== currentItemId);

    if (remainingItems.length > 0) {
      setCurrentItemId(remainingItems[0]._id); 
      setSelectedSize(''); 
      setIsPopupOpen(true);
    } else {
      orderDetails.items.forEach((item) => {
        const selectedSize = selectedSizes[item._id] || (item.sizes && item.sizes.length > 0 ? "S" : null);

        if (selectedSize) {
          addToCart(item._id, selectedSize);
        }
      });
      alert("Items have been added to your cart!");
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#E2E9EC]">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#E2E9EC]">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-[#E2E9EC] shadow-2xl rounded-xl p-8 md:p-12 relative glossy">
        {/* Title and Buttons aligned */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Track Your Order</h1>

          <div className="flex space-x-4">
            {orderDetails.status !== 'Shipped' && orderDetails.status !== 'Delivered' && (
              <button
                onClick={handleCancelRequest}
                className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Request to Cancel
              </button>
            )}
            <button
              onClick={handleReorder}
              className="px-4 py-2 bg-[#124271] text-white rounded-full shadow-md hover:bg-[#0E365A] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#124271]"
            >
              Reorder
            </button>
          </div>
        </div>

        {orderDetails ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Order ID: <span className="font-bold">{orderDetails._id}</span>
            </h2>

            {/* Advanced Progress Bar */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-600 mb-3">Order Status:</h3>
              <div className="w-full bg-gray-300 rounded-full h-4 mb-4 relative overflow-hidden">
                <div
                  className="h-4 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                  style={{ width: `${(getStatusProgress(orderDetails.status) / 4) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span className={getStatusProgress(orderDetails.status) >= 1 ? "text-green-600" : ""}>Order Placed</span>
                <span className={getStatusProgress(orderDetails.status) >= 2 ? "text-green-600" : ""}>Processing</span>
                <span className={getStatusProgress(orderDetails.status) >= 3 ? "text-green-600" : ""}>Shipped</span>
                <span className={getStatusProgress(orderDetails.status) >= 4 ? "text-green-600" : ""}>Delivered</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span> {orderDetails.status}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Amount:</span> LKR {orderDetails.amount}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Payment Method:</span> {orderDetails.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Order Date:</span> {new Date(orderDetails.date).toLocaleString()}
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Order Items</h3>
            <ul className="space-y-4 mb-6">
              {orderDetails.items.map((item) => (
                <li key={item._id} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                    {selectedSizes[item._id] && (
                      <p className="text-sm text-gray-600">Selected Size: {selectedSizes[item._id]}</p>
                    )}
                  </div>
                  <p className="text-lg font-medium text-gray-700">LKR {item.price}</p>
                </li>
              ))}
            </ul>

            {isPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-2xl font-semibold mb-4">Select Size</h2>
                  <div className="flex space-x-4">
                    {orderDetails.items
                      .find(item => item._id === currentItemId)
                      ?.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelection(size)}
                          className={`px-4 py-2 ${
                            selectedSize === size ? 'bg-blue-700' : 'bg-blue-500'
                          } text-white rounded-full hover:bg-blue-600`}
                        >
                          {size}
                        </button>
                      ))}
                  </div>

                  <div className="flex justify-end mt-4 space-x-4">
                    <button
                      onClick={closePopup}
                      className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleApplySizeSelection}
                      className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-lg text-gray-600">No order details found.</div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
