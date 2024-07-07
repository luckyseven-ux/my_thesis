import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center  p-4" style={{ backgroundImage: "url('./src/img/bg9.jpg')" }}>
      <div className="bg-gray-900 bg-opacity-10 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl text-black mb-10 font-bold">Welcome to Diabetic Predict Website</h1>
        <p className="text-xl text-gray-900 mb-10">Discover and connect with us</p>
        <div className="bg-black bg-opacity-20 p-8 rounded-lg shadow-inner">
          <div className="flex flex-col space-y-4">
            <button
              className="w-48 mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:rotate-3"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <h5 className='text-white justify-center flex flex-col'>OR</h5>
            <button
              className="w-48 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:rotate-3"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
