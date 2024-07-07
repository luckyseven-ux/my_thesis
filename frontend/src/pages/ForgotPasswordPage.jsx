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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 to-white">
      <Link
        className="flex justify-center items-center w-40 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 mb-10 rounded-lg transition duration-300"
        to="/"
      >
        Homepage
      </Link>
      <div className="w-full max-w-md transform transition duration-500 hover:scale-105">
        <form
          className="bg-white bg-opacity-80 shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Forgot Password</h1>
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
          >
            Submit
          </button>
          <p className="text-center text-gray-700 text-sm mt-4">
            Remembered your password?{' '}
            <Link className="text-green-500 hover:text-green-700" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
