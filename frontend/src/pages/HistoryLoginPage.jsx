import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HistoryLoginPage = () => {
  const [logins, setLogins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/user/login-history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogins(response.data.logins);
      } catch (error) {
        console.error('Error fetching logins:', error);
      }
    };

    fetchLogins();
  }, []);

  return (
    <div className="min-h-screen bg-sea-950 text-gray-100">
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-3xl font-bold">History Logins</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center mt-8">
        <ul>
          {logins.map((login) => (
            <li key={login.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <p>Login Time: {new Date(login.login_time).toLocaleString()}</p>
              <p>Logout Time: {login.logout_time ? new Date(login.logout_time).toLocaleString() : 'N/A'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryLoginPage;
