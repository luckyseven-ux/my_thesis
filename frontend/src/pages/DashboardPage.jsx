import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GithubLogo, EnvelopeSimple, WhatsappLogo } from "phosphor-react";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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

  const handleLogout = async () => {
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
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:3000/user/check-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundImage: "url('./src/img/bg5.jpg')" }}>
      <nav className="w-full bg-gray-900 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Logout
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow mt-8 w-full">
        <h2 className="text-2xl text-white mb-6">Selamat datang di Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { id: 1, img: "cekdiabetes.jpg", title: "Create Diabetic Record", desc: "Bikin Rekor Gula!", link: "/test" },
            { id: 2, img: "record.jpg", title: "See My History Record", desc: "Liat Jejak Manis!", link: "/history-record" },
            { id: 3, img: "fb.jpg", title: "Feedback", desc: "Curhat Yuk!", link: "/feedback" },
            { id: 4, img: "user.jpg", title: "User Data", desc: "Data Warga!", link: "/datauser" },
            { id: 5, img: "masak.jpg", title: "Blog Page", desc: "Masak Enak Yuk!", link: "/blog" },
            { id: 6, img: "about.jpg", title: "About Page", desc: "Tentang Pembuat Web", link: "/about" },
            { id: 7, img: "login.jpg", title: "History Login", desc: "Jejak Lalu!", link: "/history-login" },
          ].map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 bg-opacity-80 hover:bg-opacity-90 text-white py-6 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate(item.link)}
            >
              <img
                src={`./src/img/${item.img}`}
                alt={item.title}
                className="w-35 h-35 mb-4 rounded"
              />
              <p className="text-xl font-bold">{item.title}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="w-full bg-gray-900 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="mb-2">Created by Lucky Seven</p>
          <div className="flex justify-center mb-2">
            <GithubLogo size={32} className="mx-2" />
            <EnvelopeSimple size={32} className="mx-2" />
            <WhatsappLogo size={32} className="mx-2" />
          </div>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="https://github.com/luckyseven-ux" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            <a href="mailto:rizkykomplek@gmail.com" className="hover:underline">Email</a>
            <a href="https://wa.me/6285890128421" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
          </div>
          <aside>
            <p>Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd</p>
          </aside>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
