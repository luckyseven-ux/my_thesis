import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

    // Validate form fields
    if (username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }

    // If there are no errors, proceed with login logic
    if (errors && Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Login successful, save the token and redirect to dashboard
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        } else {
          // Login failed, display error message
          setErrors({ username: data.message || 'Invalid username or password' });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ username: 'An error occurred. Please try again.' });
      }
    } else {
      setErrors(errors);
    }}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 via-green-800 to-blue-900">
      <Link className="justify-center items-center flex w-40 bg-green-600 py-2 px-3 mb-10" to="/">
        Homepage
      </Link>
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
          {errors.username && <p className="text-red-500 mb-4">{errors.username}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={values.username}
              onChange={handleInput}
              placeholder="Enter your username"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <p className="text-gray-700 text-sm px-10">
              Don't have an account?{' '}
              <Link className="text-indigo-600 hover:text-indigo-800" to="/register">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
