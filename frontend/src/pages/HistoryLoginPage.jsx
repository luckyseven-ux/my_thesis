import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HistoryLoginPage = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if not authenticated
    }})

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/history/sessions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSessions(response.data.sessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);
  
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

  const formatTimeToJakarta = (time) => {
    if (!time) return 'N/A';
    const options = { timeZone: 'Asia/Jakarta', hour12: false };
    const date = new Date(time);
    return new Intl.DateTimeFormat('id-ID', {
      ...options,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-sea-950 text-gray-100">
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-3xl font-bold">Your History Logins</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center mt-8">
        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {sessions.map((session, index) => (
              <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col justify-between">
                <div className="text-white">
                  <p><span className="font-semibold">Login Time:</span> {formatTimeToJakarta(session.login_time)}</p>
                  <p><span className="font-semibold">Logout Time:</span> {formatTimeToJakarta(session.logout_time)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl">No login sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryLoginPage;
