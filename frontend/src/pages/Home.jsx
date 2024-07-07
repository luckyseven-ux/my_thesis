import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center' style={{ backgroundImage: "url('./src/img/bg2.jpg')" }}>
      <div className='bg-black bg-opacity-50 p-10 rounded-lg'>
        <h1 className='text-5xl text-white text-center mb-10 font-bold'>Welcome to Diabetic Predict Website</h1>
        <p className='text-xl text-gray-300 text-center mb-10'>Discover and connect with us</p>
        <div className='flex flex-col space-y-4'>
          <button
            className='w-48 mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-3 hover:shadow-xl'
            onClick={() => navigate('/register')}
          >
            Register
          </button>
          <button
            className='w-48 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-3 hover:shadow-xl'
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
