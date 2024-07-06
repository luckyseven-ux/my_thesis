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
    <div className="min-h-screen bg-sea-950 text-gray-100">
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-3xl font-bold">History Records</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </nav>
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <div className="py-4">
          <h2 className="text-2xl font-semibold leading-tight">
            Records Table
          </h2>
        </div>
        <div className="min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  No
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Pregnancies
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Glucose
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Blood Pressure
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Skin Thickness
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Insulin
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  BMI
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Diabetes Pedigree Function
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Outcome
                </th>
                <th className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                  Record Time
                </th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((record,index) => (
                  <tr key={record.id_record}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.pregnancies}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.glucose}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.blood_preasure}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.skin_thickness}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.insulin}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.bmi}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">
                        {record.diabetes_pedigree_function}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.age}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">{record.outcome}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm">
                      <p className="text-white">
                        {formatTimeToJakarta(record.record_time)}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11"
                    className="px-5 py-5 border-b border-gray-200 bg-gray-800 text-sm"
                  >
                    <p className="text-white text-center">No records found</p>
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
