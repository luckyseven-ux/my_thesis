import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecordPage = () => {
  const [values, setValues] = useState({
    name: '',
    pregnancies: '',
    glucose: '',
    blood_pressure: '',
    skin_thickness: '',
    insulin: '',
    bmi: '',
    diabetes_pedigree_function: '',
    age: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    let errors = {};
    if (values.name.trim() === '') {
      errors.name = 'Name is required';
    }
    if (values.pregnancies.trim() === '') {
      errors.pregnancies = 'Pregnancies is required';
    }
    if (values.glucose.trim() === '') {
      errors.glucose = 'Glucose is required';
    }
    if (values.blood_pressure.trim() === '') {
      errors.blood_pressure = 'Blood Pressure is required';
    }
    if (values.skin_thickness.trim() === '') {
      errors.skin_thickness = 'Skin Thickness is required';
    }
    if (values.insulin.trim() === '') {
      errors.insulin = 'Insulin is required';
    }
    if (values.bmi.trim() === '') {
      errors.bmi = 'BMI is required';
    }
    if (values.diabetes_pedigree_function.trim() === '') {
      errors.diabetes_pedigree_function = 'Diabetes Pedigree Function is required';
    }
    if (values.age.trim() === '') {
      errors.age = 'Age is required';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/record', values, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 201) {
          setMessage('Record saved successfully');
          navigate('/dashboard');
        } else {
          setMessage('Failed to save record');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 via-green-800 to-blue-900">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Record</h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {Object.keys(errors).map((key) => (
            <p key={key} className="text-red-500 mb-4">{errors[key]}</p>
          ))}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pregnancies" className="block text-gray-700 font-bold mb-2">Pregnancies</label>
            <input
              id="pregnancies"
              type="number"
              name="pregnancies"
              value={values.pregnancies}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="glucose" className="block text-gray-700 font-bold mb-2">Glucose</label>
            <input
              id="glucose"
              type="number"
              name="glucose"
              value={values.glucose}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="blood_pressure" className="block text-gray-700 font-bold mb-2">Blood Pressure</label>
            <input
              id="blood_pressure"
              type="number"
              name="blood_pressure"
              value={values.blood_pressure}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="skin_thickness" className="block text-gray-700 font-bold mb-2">Skin Thickness</label>
            <input
              id="skin_thickness"
              type="number"
              name="skin_thickness"
              value={values.skin_thickness}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="insulin" className="block text-gray-700 font-bold mb-2">Insulin</label>
            <input
              id="insulin"
              type="number"
              name="insulin"
              value={values.insulin}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bmi" className="block text-gray-700 font-bold mb-2">BMI</label>
            <input
              id="bmi"
              type="number"
              name="bmi"
              value={values.bmi}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="diabetes_pedigree_function" className="block text-gray-700 font-bold mb-2">Diabetes Pedigree Function</label>
            <input
              id="diabetes_pedigree_function"
              type="number"
              name="diabetes_pedigree_function"
              value={values.diabetes_pedigree_function}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              value={values.age}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center ">
            <button
              type="submit"
              className="w-40 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Record
            </button>
            <button
              type="button"
              onClick={()=>navigate('/dashboard')}
              className="w-40 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecordPage;
