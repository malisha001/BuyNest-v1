import { useEffect, useState,useContext } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import {toast} from 'react-toastify';
import axios from 'axios';

export default function Refund() {
    const { token, backendUrl, addToCart } = useContext(ShopContext); 
    const { orderId } = useParams(); 
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    const [rfun_reason, setOtherReason] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [reasons, setReasons] = useState([]);

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
          const formData = {
              orderID: orderDetails._id,  // directly from orderDetails
              userID: orderDetails.userId,  // directly from orderDetails
              reasons : reasons.join(', ') && rfun_reason ? reasons.join(', ') + ', ' + rfun_reason : reasons.join(', ') || rfun_reason || 'No reason specified',
              additionalInfo:additionalInfo||'',
              date: orderDetails.date  // directly from orderDetails
          };
          console.log(formData);
          
          const response = await axios.post(backendUrl + '/api/order/submit-refund', formData, { headers: { token } });
          if (response.data.success) {
              toast.success(response.data.message);
              navigate('/orders');
          } else {
              toast.error(response.data.message);
          }
      } catch (error) {
          console.log(error);
          alert(error.message);
      }
  };

  // Checkbox handler
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
        setReasons([...reasons, value]);
    } else {
        setReasons(reasons.filter((reason) => reason !== value));
    }
  };
  

    const actInput = () => {
        setIsDisabled(!isDisabled)
    }

    useEffect(() => {
        const fetchOrderDetails = async () => {
          if (!token) {
            setError('You need to be logged in to track orders');
            toast.error('You need to be logged in to track orders');
            setLoading(false);
            return;
          }
    
          try {
            const response = await axios.post(
              `${backendUrl}/api/order/refund`, 
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
            toast.error('An error occurred while fetching the order details.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchOrderDetails(); 
      }, [token, orderId, backendUrl]);
    

  return (
    <div>
        {orderDetails ? (
            <div className='my-5 items-center'>
                <h1 className="text-3xl font-bold text-gray-800 my-2">Order Summary</h1>
                <div className='flex'>
                    <div className='w-1/2 mx-2 bg-white p-6 justify-between items-start border-2 p-6 border-red-500 rounded-2xl shadow-lg max-w-3xl mx-auto'>
                    <p className='text-red-500  text-3xl'>Order ID: {orderDetails._id}</p>
                    <p>Order Total: Rs. {orderDetails.amount}.00</p>
                    <p>Order Date:<span>{new Date(orderDetails.date).toLocaleString()}</span></p>
                    </div>
                    <div className='w-full mx-2 items-center justify-between'>
                    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start p-6 bg-white rounded-2xl border-2 border-black shadow-lg max-w-3xl mx-auto'>
                    <p className='mb-2 font-semibold text-gray-700 text-lg'>Reason/s of Refund:</p>
                    <div><input type='checkbox' id='damaged' name='damaged' value='damaged' onChange={handleCheckboxChange} className='mr-5 hover:border-red accent-red-500' />Damaged</div>
                    <div><input type='checkbox' id='misssmatch' name='missmatch' value='missmatch' onChange={handleCheckboxChange} className='mr-5 hover:border-red accent-red-500'/>Product does not match description</div>
                    <div><input type='checkbox' id='other' name='other' value='other' className='mr-5 hover:border-red accent-red-500' onChange={actInput} />Other (Please specify):</div>
                    <input onChange={(e) => setOtherReason(e.target.value)} value={rfun_reason} className='w-full px-4 my-2 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition' type="text" placeholder='Other' disabled={isDisabled} />
                    <input onChange={(e) => setAdditionalInfo(e.target.value)} value={additionalInfo} className='w-full px-4 my-2 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition' type="text" placeholder='Additional Information' />
                    <button className='w-full bg-[#124271] text-white rounded-lg py-3 mt-4 hover:bg-red-600 transition'>Submit Refund Request</button>
                    </form>
                    </div>
                </div>
            </div>

        ) : (
            <p>Loading...</p>
        )}
    </div>
  )
}
