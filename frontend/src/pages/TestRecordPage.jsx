import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TestRecordPage() {
  const [values, setValues] = useState({
    name: "",
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree_function: "",
    age: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault(); // Membatalkan event default
      const token = localStorage.getItem("token");
      const authType = localStorage.getItem("authType");

      try {
        if (authType === "google") {
          // Logout dari Google
          const auth2 = window.gapi.auth2.getAuthInstance();
          await auth2.signOut();
        }

        // Mengirim permintaan logout ke backend
        await axios.post(
          "http://localhost:3000/user/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("token");
        localStorage.removeItem("authType");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    try {
      const response = await axios.post(
        "http://localhost:5000/predict/record",{ name: values.name,
            pregnancies: parseInt(values.pregnancies, 10),
            glucose: parseInt(values.glucose, 10),
            blood_pressure: parseInt(values.blood_pressure, 10),
            skin_thickness: parseInt(values.skin_thickness, 10),
            insulin: parseInt(values.insulin, 10),
            bmi: parseFloat(values.bmi),
            diabetes_pedigree_function: parseFloat(values.diabetes_pedigree_function),
            age: parseInt(values.age, 10)
          },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessage(`Prediction Result: ${response.data.probability}%`);
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: "An error occurred" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 via-green-800 to-blue-900">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Add Record
          </h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {Object.keys(errors).map((key) => (
            <p key={key} className="text-red-500 mb-4">
              {errors[key]}
            </p>
          ))}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
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
            <label
              htmlFor="pregnancies"
              className="block text-gray-700 font-bold mb-2"
            >
              Pregnancies
            </label>
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
            <label
              htmlFor="glucose"
              className="block text-gray-700 font-bold mb-2"
            >
              Glucose
            </label>
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
            <label
              htmlFor="blood_pressure"
              className="block text-gray-700 font-bold mb-2"
            >
              Blood Pressure
            </label>
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
            <label
              htmlFor="skin_thickness"
              className="block text-gray-700 font-bold mb-2"
            >
              Skin Thickness
            </label>
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
            <label
              htmlFor="insulin"
              className="block text-gray-700 font-bold mb-2"
            >
              Insulin
            </label>
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
            <label htmlFor="bmi" className="block text-gray-700 font-bold mb-2">
              BMI
            </label>
            <input
              id="bmi"
              type="number"
              name="bmi"
              step="0.1"
              value={values.bmi}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="diabetes_pedigree_function"
              className="block text-gray-700 font-bold mb-2"
            >
              Diabetes Pedigree Function
            </label>
            <input
              id="diabetes_pedigree_function"
              type="number"
              step="0.001"
              name="diabetes_pedigree_function"
              value={values.diabetes_pedigree_function}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
              Age
            </label>
            <input
              id="age"
              type="number"
              name="age"
              value={values.age}
              onChange={handleInput}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Record
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-40 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TestRecordPage;
