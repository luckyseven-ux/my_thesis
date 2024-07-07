import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/user/reset-password/${token}`, {
        
        password,
      });
      setMessage(response.data.message);
      // Optional: Redirect to login page or homepage after successful password reset
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-white">
      <div className="p-8 bg-white bg-opacity-80 shadow-2xl rounded-3xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl text-green-800 font-bold mb-6 text-center">Reset Password</h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">New Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
          >
            Reset Password
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700 text-sm">
            Kembali ke{' '}
            <Link className="text-green-500 hover:text-green-700" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
