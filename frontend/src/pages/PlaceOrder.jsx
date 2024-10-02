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
    email: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Phone number validation: check for exactly 10 digits
    if (name === 'phone') {
      const phonePattern = /^\d{10}$/; // Regex to allow exactly 10 digits
      if (!phonePattern.test(value)) {
        setError((prev) => ({ ...prev, phone: 'Phone number must be exactly 10 digits.' }));
      } else {
        setError((prev) => ({ ...prev, phone: '' })); // Clear error when valid
      }
    }

    // Email validation
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
      if (!emailPattern.test(value)) {
        setError((prev) => ({ ...prev, email: 'Invalid email format.' }));
      } else {
        setError((prev) => ({ ...prev, email: '' })); // Clear error if valid
      }
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
    if (error.firstName || error.lastName || error.city || error.state || error.country || error.zipcode || error.phone || error.email) {
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

    // Add Company Logo (Text "Forever" as logo)
    doc.setFontSize(28);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('Forever', 105, 25, { align: 'center' });

    // Add line below the logo
    doc.setLineWidth(0.5);
    doc.line(15, 30, 195, 30);

    // Company Information
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    doc.text("123 Business Street, Colombo", 105, 38, { align: "center" });
    doc.text("Phone: +94 123456789 | Email: info@forever.com", 105, 44, { align: "center" });

    // Add another separating line
    doc.line(15, 48, 195, 48);

    // Invoice Title and Date
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice`, 14, 60);
    doc.setFontSize(12);
    doc.text(`Invoice No: 12345`, 14, 70);  // You can dynamically generate this invoice number
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 76);

    // Customer Information
    doc.setFontSize(12);
    doc.text(`Bill To:`, 14, 90);
    doc.setFont('helvetica', 'bold');
    doc.text(`${formData.firstName} ${formData.lastName}`, 14, 96);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.street}, ${formData.city}`, 14, 102);
    doc.text(`${formData.state}, ${formData.zipcode}`, 14, 108);
    doc.text(`${formData.country}`, 14, 114);
    doc.text(`Phone: ${formData.phone}`, 14, 120);
    doc.text(`Email: ${formData.email}`, 14, 126);

    // Add space before the table
    doc.setLineWidth(0.5);
    doc.line(15, 130, 195, 130);

    // Order Details Table
    const tableColumn = ['Item', 'Size', 'Qty', 'Unit Price (LKR)', 'Total (LKR)'];
    const tableRows = [];

    Object.keys(cartItems).forEach((productId) => {
      Object.keys(cartItems[productId]).forEach((size) => {
        const product = products.find((p) => p._id === productId);
        const rowData = [
          product ? product.name : '',
          size,
          cartItems[productId][size],
          (product ? product.price.toFixed(2) : '0.00'),
          (product ? (product.price * cartItems[productId][size]).toFixed(2) : '0.00'),
        ];
        tableRows.push(rowData);
      });
    });

    // Add table with striped rows and elegant formatting
    doc.autoTable({
      startY: 140,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },  // Custom colors
      styles: { fontSize: 11, cellPadding: 3 },
      columnStyles: { 0: { halign: 'left' }, 4: { halign: 'right' } },
    });

    // Calculate positions for summary
    const finalY = doc.autoTable.previous.finalY + 10;
    const subtotal = getCartAmount();
    const deliveryFee = delivery_fee;
    const total = subtotal + deliveryFee;

    // Add Summary Information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Summary`, 14, finalY);
    doc.setFont('helvetica', 'normal');
    doc.text(`Subtotal:`, 150, finalY + 10, { align: 'right' });
    doc.text(`LKR ${subtotal.toFixed(2)}`, 190, finalY + 10, { align: 'right' });
    doc.text(`Delivery Fee:`, 150, finalY + 20, { align: 'right' });
    doc.text(`LKR ${deliveryFee.toFixed(2)}`, 190, finalY + 20, { align: 'right' });
    doc.text(`Total:`, 150, finalY + 30, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(`LKR ${total.toFixed(2)}`, 190, finalY + 30, { align: 'right' });

    // Footer section
    doc.setLineWidth(0.5);
    doc.line(15, finalY + 40, 195, finalY + 40); // Line before footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for shopping with us!', 105, finalY + 50, { align: 'center' });
    doc.text('For inquiries, contact info@forever.com', 105, finalY + 56, { align: 'center' });

    // Save the PDF
    doc.save(`Invoice_${new Date().toLocaleDateString()}.pdf`);
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
        {error.email && <p className='text-red-500 text-sm'>{error.email}</p>} {/* Display email error */}
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
