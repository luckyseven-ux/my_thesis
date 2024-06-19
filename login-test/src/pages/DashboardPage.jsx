

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const DashboardPage = () => {
  const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      // Kirim permintaan logout ke backend
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Hapus token dari localStorage atau sessionStorage
      localStorage.removeItem('token');

      // Redirect ke halaman login
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  const handleLogout2 = () => {
    // Hapus token dari localStorage atau sessionStorage
    localStorage.removeItem('token');
    // Redirect ke halaman login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-sea-950 text-gray-100">
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Logout
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-2xl">Welcome to the Dashboard</h2>
        {/* Konten dashboard Anda di sini */}
      </div>
    </div>
  );
};

export default DashboardPage;
