import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending reset password email:', error);
      setMessage('Error sending reset password email');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 via-green-800 to-blue-900">
      <Link className="justify-center items-center flex w-40 bg-green-600 py-2 px-3 mb-10" to="/">
        Homepage
      </Link>
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Forgot Password</h1>
          {message && <p className="text-center text-red-500 mb-4">{message}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
          <p className="text-gray-700 text-sm px-10 mt-4">
            Remembered your password?{' '}
            <Link className="text-indigo-600 hover:text-indigo-800" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
