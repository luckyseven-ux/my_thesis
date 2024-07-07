import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginPage() {
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = values;
    let errors = {};

    // Validasi form fields
    if (username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }

    // Jika tidak ada kesalahan, lanjutkan dengan logika login
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        
        // Log untuk memeriksa respons dari server
        console.log('Login response:', data);
        
        if (response.status === 200) {
          const { token, user_id } = data;  // Mengambil dari data, bukan response.data
          localStorage.setItem('token', token);
          localStorage.setItem('user_id', user_id);
          navigate('/dashboard');
        } else {
          setErrors({ login: 'Login failed' });  // Set kesalahan login ke state errors
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ login: 'An error occurred. Please try again.' });  // Set kesalahan jaringan ke state errors
      }
    } else {
      setErrors(errors);  // Set kesalahan validasi ke state errors
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/google/callback', {
        token: credentialResponse.credential,
      });

      if (response.data.user) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setErrors({ username: 'Google login failed' });
      }
    } catch (error) {
      console.error('Google login error:', error);
      setErrors({ username: 'Google login failed' });
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
    setErrors({ username: 'Google login failed' });
  };

  return (
    <GoogleOAuthProvider clientId="1029364454690-gvv235i6jbdl9cv6lqq4qqjubuoo2aek.apps.googleusercontent.com">
      <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center  p-4" style={{ backgroundImage: "url('./src/img/bg3.jpg')" }}>
        <Link className="flex justify-center items-center w-40 bg-green-600 py-2 px-3 mb-10 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105" to="/">
          Homepage
        </Link>
        <div className="w-full max-w-md">
          <form className="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-semibold text-center text-white mb-6">Login</h1>
            {errors.username && <p className="text-red-500 mb-4">{errors.username}</p>}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300 font-bold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={values.username}
                onChange={handleInput}
                placeholder="Enter your username"
                className="w-full px-3 py-2 text-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleInput}
                placeholder="Enter your password"
                className="w-full px-3 py-2 text-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            {errors.login && <p className="text-red-500 mb-4">{errors.login}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              >
                Sign In
              </button>
            </div>
            <p className="text-gray-400 text-sm text-center mt-4">
              Don't have an account?{' '}
              <Link className="text-indigo-400 hover:text-indigo-600" to="/register">
                Register
              </Link>
            </p>
            <p className="text-gray-400 text-sm text-center mt-4">
              or {' '}
              <Link className="text-indigo-400 hover:text-indigo-600" to="/forgot">
                Forgot Password
              </Link>
            </p>
            <div className="flex items-center justify-center mt-4">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
              />
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
