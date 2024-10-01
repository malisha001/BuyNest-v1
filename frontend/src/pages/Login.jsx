import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const userData = { email, password };
      if (currentState === 'Sign Up') {
        userData.name = name;
      }
      const response = await axios.post(backendUrl + endpoint, userData);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        const userInfo = { email: response.data.email, name: response.data.name, token: response.data.token, id: response.data.id };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // Navigate to '/assis-dash' if the logged-in user's email is 'helper@gmail.com'
        if (email === 'helper@gmail.com') {
          navigate('/assis-dash');
        } else {
          navigate('/');
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">{currentState}</h1>

        {currentState === 'Sign Up' && (
          <input
            type="text"
            className="input-field"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-indigo-600">Forgot your password?</span>
          {currentState === 'Login' ? (
            <span onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:text-indigo-600">
              Create account
            </span>
          ) : (
            <span onClick={() => setCurrentState('Login')} className="cursor-pointer hover:text-indigo-600">
              Login Here
            </span>
          )}
        </div>

        <button type="submit" className="mt-6 w-full py-3 text-white bg-[#124271] rounded-lg shadow-md hover:bg-[#0e3b5c] transition-all">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

        <style>{`
          .input-field {
            width: 100%;
            padding: 12px;
            margin-bottom: 16px;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            transition: border-color 0.3s ease;
          }
          .input-field:focus {
            border-color: #124271;
            outline: none;
          }
        `}</style>
      </form>
    </div>
  );
};

export default Login;
