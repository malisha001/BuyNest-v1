import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaDownload } from 'react-icons/fa'; // Importing the download icon from react-icons

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // For phone validation
    if (name === 'phone' && value.length > 10) {
      setError((prev) => ({ ...prev, phone: 'Enter only 10 numbers.' }));
      return; // Stop processing if the length exceeds 10
    } else {
      setError((prev) => ({ ...prev, phone: '' })); // Clear error when valid
    }

    setFormData((data) => ({ ...data, [name]: value }));

    // Clear error message when input is updated
    if (['firstName', 'lastName', 'city', 'state', 'country', 'zipcode'].includes(name)) {
      setError((prev) => ({ ...prev, [name]: '' }));
    }

    // Check if the zipcode is negative
    if (name === 'zipcode' && value < 0) {
      setError((prev) => ({ ...prev, [name]: 'Zipcode must be greater than or equal to 0.' }));
    }
  };

  // Key press validation to allow only letters for specific fields
  const handleKeyPress = (event, fieldName) => {
    const regex = /^[A-Za-z]+$/; // Regex to allow only letters
    if (!regex.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault(); // Prevent default action (typing)
      setError((prev) => ({
        ...prev,
        [fieldName]: 'Please enter only letters.',
      }));
    }
  };

  // Key press validation to allow only numbers for phone field
  const handlePhoneKeyPress = (event) => {
    const regex = /^[0-9]+$/; // Regex to allow only numbers
    if (!regex.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault(); // Prevent default action (typing)
      setError((prev) => ({
        ...prev,
        phone: 'Please enter only numbers.',
      }));
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
          if (data.success) {
            navigate('/orders');
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Validate error state before proceeding
    if (error.firstName || error.lastName || error.city || error.state || error.country || error.zipcode || error.phone) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to generate and download the bill
  const downloadBill = () => {
    const doc = new jsPDF();

    // Add the title of the document
    doc.setFontSize(20);
    doc.text('Order Bill', 105, 10, { align: 'center' });

    // Add customer details
    doc.setFontSize(12);
    doc.text(`Customer Name: ${formData.firstName} ${formData.lastName}`, 14, 30);
    doc.text(`Email: ${formData.email}`, 14, 40);
    doc.text(`Address: ${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipcode}, ${formData.country}`, 14, 50);
    doc.text(`Phone: ${formData.phone}`, 14, 60);

    // Create table for the cart items
    const tableColumn = ['Product', 'Size', 'Quantity', 'Price'];
    const tableRows = [];

    Object.keys(cartItems).forEach((productId) => {
      Object.keys(cartItems[productId]).forEach((size) => {
        const product = products.find((p) => p._id === productId);
        const rowData = [
          product ? product.name : '',
          size,
          cartItems[productId][size],
          `LKR ${(product ? product.price : 0) * cartItems[productId][size]}`, // Using LKR as currency
        ];
        tableRows.push(rowData);
      });
    });

    // Add table to PDF
    doc.autoTable({
      startY: 70,
      head: [tableColumn],
      body: tableRows,
    });

    // Add total amount at the end of the table
    const totalAmount = getCartAmount() + delivery_fee;
    doc.text(`Delivery Fee: LKR ${delivery_fee.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Amount: LKR ${totalAmount.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);

    // Save the PDF
    doc.save('Order_Bill.pdf');
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------- Left Side ---------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            onKeyPress={(event) => handleKeyPress(event, 'firstName')}
            name='firstName'
            value={formData.firstName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First name'
          />
          {error.firstName && <p className='text-red-500 text-sm'>{error.firstName}</p>}
          <input
            required
            onChange={onChangeHandler}
            onKeyPress={(event) => handleKeyPress(event, 'lastName')}
            name='lastName'
            value={formData.lastName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Last name'
          />
          {error.lastName && <p className='text-red-500 text-sm'>{error.lastName}</p>}
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            onKeyPress={(event) => handleKeyPress(event, 'city')}
            name='city'
            value={formData.city}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='City'
          />
          {error.city && <p className='text-red-500 text-sm'>{error.city}</p>}
          <input
            onChange={onChangeHandler}
            onKeyPress={(event) => handleKeyPress(event, 'state')}
            name='state'
            value={formData.state}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='State'
          />
          {error.state && <p className='text-red-500 text-sm'>{error.state}</p>}
        </div>
        <div className='flex gap-3'>
          <input 
            required 
            onChange={onChangeHandler} 
            name='zipcode' 
            value={formData.zipcode} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type='number' 
            min='0' 
            placeholder='Zipcode'
          />
          {error.zipcode && <p className='text-red-500 text-sm'>{error.zipcode}</p>}
          <input
            required
            onChange={onChangeHandler}
            onKeyPress={handlePhoneKeyPress}
            name='phone'
            value={formData.phone}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='number'
            placeholder='Phone'
          />
          {error.phone && <p className='text-red-500 text-sm'>{error.phone}</p>}
        </div>
        <input
          required
          onChange={onChangeHandler}
          onKeyPress={(event) => handleKeyPress(event, 'country')}
          name='country'
          value={formData.country}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text'
          placeholder='Country'
        />
        {error.country && <p className='text-red-500 text-sm'>{error.country}</p>}
      </div>

      {/* ------------- Right Side ------------------ */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* --------------- Payment Method Selection ------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Buttons in the same row */}
          <div className='w-full text-end mt-8 flex gap-4 justify-end'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            <button type='button' onClick={downloadBill} className='bg-green-500 text-white px-6 py-3 text-sm flex items-center gap-2'>
              <FaDownload /> Bill
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
