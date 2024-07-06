import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  });

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

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const authType = localStorage.getItem("authType");

    try {
      if (authType === "google") {
        // Logout dari Google
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
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-sea-950 text-gray-100 flex flex-col">
      <nav className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Logout
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow mt-8">
        <h2 className="text-2xl mb-6">Selamat datang di Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <div
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/test")}
          >
            <img
              src="./src/img/cekdiabetes.jpg"
              alt="Create Diabetic Record"
              className="w-35 h-35 mb-4"
            />
            <p className="text-xl font-bold">Create Diabetic Record</p>
            <p className="text-sm">Bikin Rekor Gula!</p>
          </div>
          <div
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/history-record")}
          >
            <img
              src="./src/img/record.jpg"
              alt="See My History Record"
              className="w-35 h-35 mb-4"
            />
            <p className="text-xl font-bold">See My History Record</p>
            <p className="text-sm">Liat Jejak Manis!</p>
          </div>
          <div
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/feedback")}
          >
            <img
              src="./src/img/fb.jpg"
              alt="Feedback"
              className="w-35 h-35 mb-4"
            />
            <p className="text-xl font-bold">Feedback</p>
            <p className="text-sm">Curhat Yuk!</p>
          </div>
          <div
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/datauser")}
          >
            <img
              src="./src/img/user.jpg"
              alt="User Data"
              className="w-35 h-35 mb-4"
            />
            <p className="text-xl font-bold">User Data</p>
            <p className="text-sm">Data Warga!</p>
          </div>
          <div
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/blog")}
          >
            <img src="./src/img/fb.jpg" alt="Blog" className="w-35 h-35 mb-4" />
            <p className="text-xl font-bold">Laman Blog</p>
            <p className="text-sm">Masak Enak Yuk!</p>
          </div>
          <div
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/about")}
          >
            <img
              src="./src/img/user.jpg"
              alt="User Data"
              className="w-35 h-35 mb-4"
            />
            <p className="text-xl font-bold">Si Paling Pembuat</p>
            <p className="text-sm">Tentang Web</p>
          </div>
          <div
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/history-login")}
          >
            <img
              src="./src/img/login.jpg"
              alt="History Login"
              className="w-35 h-35 mb-4"
            />
            <p className="text-xl font-bold">History Login</p>
            <p className="text-sm">Jejak Lalu!</p>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="mb-2">Created by Lucky Seven</p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/luckyseven-ux" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            <a href="mailto:rizkykomplek@gmail.com" className="hover:underline">Email</a>
            <a href="https://wa.me/6285890128421" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
          </div>
          <aside>
    <p>Copyright © ${new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
