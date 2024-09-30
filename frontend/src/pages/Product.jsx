import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { FaVolumeUp, FaVolumeMute, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // Importing icons for notifications

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [notification, setNotification] = useState(null); // State for notifications

  useEffect(() => {
    const fetchProductData = async () => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    };

    fetchProductData();
  }, [productId, products]);

  const handleVoiceOver = () => {
    if (window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance();
      if (!isSpeaking) {
        speech.text = `Product name: ${productData.name}. Description: ${productData.description}`;
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

  const handleAddToCart = () => {
    if (!size) {
      setNotification({ type: 'warning', message: 'Please select a size before adding to cart.' });
      return;
    }
    addToCart(productData._id, size);
    setNotification({ type: 'success', message: 'Item added to cart successfully!' });
  };

  // Function to read the notification aloud
  const readNotification = (message) => {
    if (window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(speech);
    }
  };

  useEffect(() => {
    return () => {
      if (isSpeaking) window.speechSynthesis.cancel();
    };
  }, [isSpeaking]);

  // Notification component with auto-dismiss after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000); // Auto dismiss notification after 3 seconds
      readNotification(notification.message); // Trigger reading the notification when it appears
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [notification]);

  // Notification rendering logic
  const renderNotification = () => {
    if (!notification) return null;
    const { type, message } = notification;

    const icon =
      type === 'success' ? <FaCheckCircle className="text-green-500" size={32} /> :
      type === 'warning' ? <FaExclamationCircle className="text-yellow-500" size={32} /> : null;

    return (
      <div
        role="alert"
        className={`fixed top-[120px] left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg border ${
          type === 'success' ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
        } flex items-center gap-3`}
      >
        {icon}
        <p className="text-gray-700 text-lg" aria-live="polite">
          {message}
        </p>
      </div>
    );
  };

  return productData ? (
    <div className="min-h-screen bg-gray-50 py-12 px-4 lg:px-20 relative">
      {/* Notification */}
      {renderNotification()}

      {/* Product Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="flex flex-col gap-6">
          <div className="w-full h-auto border rounded-lg overflow-hidden shadow-md">
            <img src={image} alt={productData.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {productData.image.map((img, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-md border cursor-pointer hover:shadow-lg ${
                  img === image ? 'border-indigo-500' : ''
                }`}
                onClick={() => setImage(img)}
              >
                <img src={img} alt={`Product thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{productData.name}</h1>

            {/* Voice Over Button */}
            <button
              onClick={handleVoiceOver}
              className={`p-3 rounded-full shadow-md transition duration-300 transform hover:scale-105 ${
                isSpeaking ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'
              } text-white mb-6`}
              aria-label={isSpeaking ? 'Stop Voice Over' : 'Start Voice Over'}
            >
              {isSpeaking ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>

            {/* Price and Rating */}
            <div className="flex items-center gap-4 mb-4">
              <p className="text-3xl font-semibold text-gray-900">{currency}{productData.price}</p>
              <div className="flex items-center">
                {[...Array(4)].map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="Star" className="w-5" />
                ))}
                <img src={assets.star_dull_icon} alt="Star" className="w-5" />
                <p className="ml-2 text-gray-500">(122)</p>
              </div>
            </div>

            {/* Product Description */}
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{productData.description}</p>

            {/* Size Selection */}
            <div className="flex flex-col gap-4">
              <p className="text-lg font-medium">Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-full border ${
                      s === size ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                    } hover:bg-indigo-600 hover:text-white transition-all`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-[#124271] text-white py-3 rounded-lg shadow-md hover:bg-[#0d355c] transition-all"
            >
              Add to Cart
            </button>

            {/* Product Guarantees */}
            <div className="mt-8 text-sm text-gray-600">
              <p>100% Original product.</p>
              <p>Cash on delivery available.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="max-w-6xl mx-auto mt-16 border-t pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-b-4 border-indigo-500 py-3 text-center text-lg font-semibold">Description</div>
          <div className="py-3 text-center text-lg">Reviews (122)</div>
        </div>
        <div className="mt-6 space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            Our e-commerce platform facilitates easy product exploration and purchase. You can browse products, read detailed descriptions, and select various options before purchasing.
          </p>
          <p>
            We ensure our product pages provide all the necessary information, making shopping convenient and reliable for our customers.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : null;
};

export default Product;
