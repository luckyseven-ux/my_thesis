import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDataPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
    } setIsLoading(false); // Pastikan ini selalu dipanggil
    console.log("Token:", token); // Tambahkan ini untuk melihat nilai token di konsol
  }, [navigate]);

  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Received user data:", response.data.profile);
        setUserData(response.data.profile[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError('Failed to fetch user data');
      }
    };
    
    fetchUserData();
  }, []);
  
  if (error) {
    return <div>{error}</div>;
  }
  
  if (!userData) {
    return <div>Loading...</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center  p-4" style={{ backgroundImage: "url('./src/img/bg2.jpg')" }}>
      <div className="bg-green-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">User Data</h1>
        <div className="mb-4">
          <p className="mb-2"><span className="font-semibold">ID:</span> {userData.id}</p>
          <p className="mb-2"><span className="font-semibold">Username:</span> {userData.username}</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> {userData.email}</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-2 mt-4 bg-sky-400 hover:bg-sky-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UserDataPage;
