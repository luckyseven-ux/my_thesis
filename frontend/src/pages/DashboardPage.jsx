import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault(); // Membatalkan event default
      const token = localStorage.getItem('token');
      const authType = localStorage.getItem('authType');

      try {
        if (authType === 'google') {
          // Logout dari Google
          const auth2 = window.gapi.auth2.getAuthInstance();
          await auth2.signOut();
        }

        // Mengirim permintaan logout ke backend
        await axios.post('http://localhost:3000/user/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        localStorage.removeItem('token');
        localStorage.removeItem('authType');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const authType = localStorage.getItem('authType');

    try {
      if (authType === 'google') {
        // Logout dari Google
        const auth2 = window.gapi.auth2.getAuthInstance();
        await auth2.signOut();
      }

      await axios.post('http://localhost:3000/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('authType');
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
        <h2 className="text-2xl mb-6">Selamat datang di Dashboard</h2>
        <div className="flex justify-between w-full max-w-md">
          <button
            type="button"
            className="flex-1 mx-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            onClick={() => navigate('/record')}
          >
            Tambah Catatan
          </button>
          <button
            type="button"
            className="flex-1 mx-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            onClick={() => navigate('/history-record')}
          >
            Riwayat Catatan
          </button>
          <button
            type="button"
            className="flex-1 mx-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            onClick={() => navigate('/history-login')}
          >
            Riwayat Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
