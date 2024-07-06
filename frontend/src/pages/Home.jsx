import React from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  return (
    
    <div className='bg-slate-900 p-10 min-h-screen flex flex-col'>
      <h3 className='text-4xl text-white text-center mb-10'>Ini Homepage</h3>

      <button
        className='w-40 mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4  focus:outline-none transition-all duration-1s'
        onClick={() => navigate('/register')}
      >
        Register
      </button>
      
      <button
        className='w-40 mx-auto mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4  focus:outline-none transition duration-300 ease-in-out'
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      
    </div>
  );
}

export default Home;
