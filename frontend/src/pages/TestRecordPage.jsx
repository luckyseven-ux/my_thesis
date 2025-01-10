import React, { useState, useEffect } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
    } else {
      // Verify token with the backend
      axios.get("http://localhost:3000/user/check-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      })
      .catch(error => {
        navigate("/login");
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!values.age || values.age < 1 || values.age > 8) {
      setErrors({ ...errors, age: "Please select a valid age range (1–8)." });
      return;
    }
  
    // Proses pengiriman data jika validasi lolos
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/predict/record",
        {
          name: values.name,
          pregnancies: parseInt(values.pregnancies, 10),
          glucose: parseInt(values.glucose, 10),
          blood_pressure: parseInt(values.blood_pressure, 10),
          skin_thickness: parseInt(values.skin_thickness, 10),
          insulin: parseInt(values.insulin, 10),
          bmi: parseFloat(values.bmi),
          diabetes_pedigree_function: parseFloat(values.diabetes_pedigree_function),
          age: parseInt(values.age, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
  
  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const authType = localStorage.getItem("authType");

      try {
        if (authType === "google") {
          const auth2 = window.gapi.auth2.getAuthInstance();
          await auth2.signOut();
        }

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('./src/img/bg10.jpg')" }}>
      <div className="w-full max-w-md bg-green-400 bg-opacity-90 rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold text-center text-green-900 mb-6">Add Record</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-green-900 font-bold mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleInput}
              className="w-full px-3 py-2 text-green-900 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="pregnancies" className="block text-green-900 font-bold mb-2">Pregnancies</label>
            <input
              id="pregnancies"
              type="number"
              name="pregnancies"
              value={values.pregnancies}
              onChange={handleInput}
              className="w-full px-3 py-2 text-green-900 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="glucose" className="block text-green-900 font-bold mb-2">Glucose</label>
            <input
              id="glucose"
              type="number"
              name="glucose"
              value={values.glucose}
              onChange={handleInput}
              className="w-full px-3 py-2 text-green-900 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="blood_pressure" className="block text-green-900 font-bold mb-2">Blood Pressure</label>
            <input
              id="blood_pressure"
              type="number"
              name="blood_pressure"
              value={values.blood_pressure}
              onChange={handleInput}
              className="w-full px-3 py-2 text-green-900 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="skin_thickness" className="block text-green-900 font-bold mb-2">Skin Thickness</label>
            <input
              id="skin_thickness"
              type="number"
              name="skin_thickness"
              value={values.skin_thickness}
              onChange={handleInput}
              className="w-full px-3 py-2 text-green-900 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="insulin" className="block text-green-900 font-bold mb-2">Insulin</label>
            <input
              id="insulin"
              type="number"
              name="insulin"
              value={values.insulin}
              onChange={handleInput}
              className="w-full px-3 py-2 text-green-900 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="bmi" className="block text-green-900 font-bold mb-2">BMI</label>
            <input
              id="bmi"
              type="number"
              step="0.1"
              name="bmi"
              value={values.bmi}
              onChange={handleInput}
              className="w-full px-3 py-2 text-green-900 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="diabetes_pedigree_function" className="block text-green-900 font-bold mb-2">Diabetes Pedigree Function</label>
            <input
              id="diabetes_pedigree_function"
              type="number"
              step="0.01"
              name="diabetes_pedigree_function"
              value={values.diabetes_pedigree_function}
              onChange={handleInput}
              className="w-full px-3 py-2 text-green-900 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
            />
          </div>
          <div className="mb-4">
          <select
  name="age"
  value={values.age}
  onChange={handleInput}
>
  <option value="">Select Age Range</option>
  <option value="1">≤ 25</option>
  <option value="2">26–30</option>
  <option value="3">31–35</option>
  <option value="4">36–40</option>
  <option value="5">41–45</option>
  <option value="6">46–50</option>
  <option value="7">51–60</option>
  <option value="8"> 60</option>
</select>
          </div>
            {message && <p className="text-green-900 mb-4 justify-center flex flex-col">{message}</p>}
            {Object.keys(errors).map((key) => (
              <p key={key} className="text-red-500 mb-4">{errors[key]}</p>
            ))}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              type="submit"
              className="w-40 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-300 hover:scale-105"
              >
              Calculate
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-40 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-300 hover:scale-105"
              >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestRecordPage;
