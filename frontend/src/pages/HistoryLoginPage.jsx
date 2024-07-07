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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-900" style={{ backgroundImage: "url('./src/img/bg3.jpg')" }}>
      <nav className="flex justify-between items-center bg-green-800 p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Your History Logins</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </nav>
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <div className="py-4">
          <h2 className="text-2xl font-semibold leading-tight text-white">Login Sessions</h2>
        </div>
        <div className="min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200 bg-green-100 bg-opacity-90">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  No
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Day
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Login Time
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Logout Time
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{new Date(session.login_time).toLocaleDateString('id-ID', { weekday: 'long' })}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{formatTimeToJakarta(session.login_time)}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{formatTimeToJakarta(session.logout_time)}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                    <p className="text-green-900 text-center">No login sessions found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default HistoryLoginPage;
