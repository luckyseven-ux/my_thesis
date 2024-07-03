import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HistoryRecordPage = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if not authenticated
    }})

    
    useEffect(() => {
      const fetchRecords = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/history/record', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecords(response.data.records);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };
    
    fetchRecords();
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

  return (
    <div className="min-h-screen bg-sea-950 text-gray-100">
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-3xl font-bold">History Records</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center mt-8">
        <ul>
          {records.map((record) => (
            <li key={record.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <p>Name: {record.name}</p>
              <p>Pregnancies: {record.pregnancies}</p>
              <p>Glucose: {record.glucose}</p>
              <p>Blood Pressure: {record.blood_pressure}</p>
              <p>Skin Thickness: {record.skin_thickness}</p>
              <p>Insulin: {record.insulin}</p>
              <p>BMI: {record.bmi}</p>
              <p>Diabetes Pedigree Function: {record.diabetes_pedigree_function}</p>
              <p>Age: {record.age}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryRecordPage;

