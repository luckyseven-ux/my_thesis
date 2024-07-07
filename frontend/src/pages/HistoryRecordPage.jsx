import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HistoryRecordPage = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/history/record",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Received records:", response.data.records); // Tambahkan log ini
        setRecords(response.data.records);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

  const formatTimeToJakarta = (time) => {
    if (!time) return "N/A";
    const options = { timeZone: "Asia/Jakarta", hour12: false };
    const date = new Date(time);
    const day = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
      date
    );
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      ...options,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
    return `${day}, ${formattedDate}`;
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-900" style={{ backgroundImage: "url('./src/img/bg3.jpg')" }}>
      <nav className="flex justify-between items-center bg-green-800 p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-white">History Records</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </nav>
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <div className="py-4">
          <h2 className="text-2xl font-semibold leading-tight text-white">
            Records Table
          </h2>
        </div>
        <div className="min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200 bg-green-100 bg-opacity-90">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  No
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Pregnancies
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Glucose
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Blood Pressure
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Skin Thickness
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Insulin
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  BMI
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Diabetes Pedigree Function
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Age
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Outcome
                </th>
                <th className="px-5 py-3 bg-green-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Record Time
                </th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={record.id_record}>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.pregnancies}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.glucose}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.blood_preasure}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.skin_thickness}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.insulin}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.bmi}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.diabetes_pedigree_function}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.age}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">{record.outcome}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                      <p className="text-green-900">
                        {formatTimeToJakarta(record.record_time)}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="px-5 py-5 border-b border-green-200 bg-green-100 text-sm">
                    <p className="text-green-900 text-center">No records found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryRecordPage;
