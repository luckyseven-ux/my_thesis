import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function RegisterPage() {
  const [values, setValues] = useState({ username: '', password: '', email: '', retype_password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, retype_password } = values;
    let errors = {};

    if (username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (email.trim() === '') {
      errors.email = 'E-mail is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }
    if (retype_password.trim() === '' || retype_password !== password) {
      errors.retype_password = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:3000/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, retype_password }),
        });

        const data = await response.json();

        if (response.ok) {
          navigate('/login');
        } else {
          setErrors({ general: data.message || 'Registration failed' });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center  p-4" style={{ backgroundImage: "url('./src/img/bg9.jpg')" }}
    >
      <Link className="flex justify-center items-center w-40 bg-green-500 py-2 px-3 mb-10 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105" to="/">
        Homepage
      </Link>
      <div className="w-full max-w-md transform transition duration-500 hover:scale-105">
        <form className="bg-white bg-opacity-80 shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Register</h1>
          {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
            />
          </div>
          {errors.email && <p className="text-red-500 mb-4">{errors.email}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
            />
          </div>
          {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}
          <div className="mb-4">
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
            />
          </div>
          {errors.retype_password && <p className="text-red-500 mb-4">{errors.retype_password}</p>}
          <div className="mb-4">
            <label htmlFor="retype_password" className="block text-gray-700 font-bold mb-2">
              Retype Password
            </label>
            <input
              id="retype_password"
              type="password"
              name="retype_password"
              value={values.retype_password}
              onChange={handleInput}
              placeholder="Retype your password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Register
            </button>
          </div>
          <p className="text-gray-700 text-sm text-center mt-4">
            Already have an account?{' '}
            <Link className="text-green-500 hover:text-green-700 transition duration-300 ease-in-out transform hover:scale-105" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
