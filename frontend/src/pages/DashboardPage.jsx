import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleLogout = async () => {
    const authType = localStorage.getItem('authType');
    const token = localStorage.getItem('token');

    try {
      if (authType === 'google') {
        // Logout dari Google
        const auth2 = window.gapi.auth2.getAuthInstance();
        await auth2.signOut();

        // Kirim permintaan logout ke backend untuk Google auth
        await axios.post('http://localhost:3000/auth/google/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        // Logout untuk autentikasi normal
        await axios.post('http://localhost:3000/user/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // Hapus token dan authType dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('authType');

      // Redirect ke halaman login
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
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