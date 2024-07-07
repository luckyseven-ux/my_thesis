import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function aboutPage() {
    const navigate = useNavigate()

    

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
    useEffect(() => {
        const handleBeforeUnload = async (event) => {
          event.preventDefault(); // Membatalkan event default
          const token = localStorage.getItem('token');
          const authType = localStorage.getItem('authType')
    
          try {
            if (authType === 'google') {
              // Logout dari Google
              const auth2 = window.gapi.auth2.getAuthInstance();
              await auth2.signOut();
            }
    
            // Mengirim permintaan logout ke backend
            await axios.post('http://localhost:3000/user/logout', {}, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            localStorage.removeItem('token');
            localStorage.removeItem('authType');
          } catch (error) {
            console.error('Error logging out:', error);
          }
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-900 flex flex-col items-center justify-center p-8" style={{ backgroundImage: "url('./src/img/bg2.jpg')" }}>
      <div className="bg-emerald-500 p-8 rounded-lg shadow-lg w-full max-w-4xl bg-opacity-90">
  <h1 className="text-4xl font-bold mb-6 text-white">Tentang Kami</h1>
  <p className="mb-4 text-white">
    Selamat datang di platform kami! Kami berdedikasi untuk memberikan pelayanan terbaik untuk Anda. Tim kami bekerja tanpa kenal lelah untuk memastikan pengalaman Anda mulus, efisien, dan menyenangkan.
  </p>
  <p className="mb-4 text-white">
    Misi kami adalah memberdayakan individu dan organisasi melalui solusi inovatif. Kami percaya pada kekuatan teknologi untuk mengubah hidup dan menciptakan peluang. Apapun kebutuhan Anda, baik itu mengelola tugas, melacak kemajuan, atau berkolaborasi dengan orang lain, kami memiliki alat yang Anda butuhkan.
  </p>
  <p className="mb-4 text-white">
    Didirikan pada tahun [Tahun], perusahaan kami telah berkembang dari sebuah startup kecil menjadi pemimpin di industri ini. Kesuksesan kami berkat tim yang berdedikasi dan pelanggan setia kami. Masukan dan dukungan Anda mendorong kami untuk terus meningkatkan dan berinovasi.
  </p>
  <p className="mb-4 text-white">
    Terima kasih telah memilih platform kami. Kami berkomitmen untuk kesuksesan Anda dan siap mendukung Anda di setiap langkah. Jika Anda memiliki pertanyaan, saran, atau masukan, jangan ragu untuk menghubungi kami.
  </p>
  <p className="mb-4 text-white">
    Bersama-sama, mari kita ciptakan sesuatu yang luar biasa!
  </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default aboutPage