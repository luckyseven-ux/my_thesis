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
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-slate-900 via-green-800 to-blue-900">
      <div className="p-8 bg-gray-700 shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-2xl text-white font-bold mb-4 text-center">Reset Password</h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">New Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-white">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
            <p className="text-white text-sm px-10 mt-4">
            Kembali Ke {' '}
            <Link className="text-indigo-600 hover:text-indigo-800" to="/login">
              Login
            </Link>
          </p>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
