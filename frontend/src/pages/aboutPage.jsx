import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function aboutPage() {
    const navigate = useNavigate()
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
    <div className="min-h-screen bg-sea-950 text-gray-100 flex flex-col items-center justify-center p-8">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="mb-4">
        Welcome to our platform! We are dedicated to providing you with the best service possible. Our team works tirelessly to ensure that your experience is seamless, efficient, and enjoyable.
      </p>
      <p className="mb-4">
        Our mission is to empower individuals and organizations through innovative solutions. We believe in the power of technology to transform lives and create opportunities. Whether you are looking to manage your tasks, track your progress, or collaborate with others, we have the tools you need.
      </p>
      <p className="mb-4">
        Founded in [Year], our company has grown from a small startup to a leader in the industry. We owe our success to our dedicated team and our loyal customers. Your feedback and support drive us to constantly improve and innovate.
      </p>
      <p className="mb-4">
        Thank you for choosing our platform. We are committed to your success and are here to support you every step of the way. If you have any questions, suggestions, or feedback, please don't hesitate to reach out to us.
      </p>
      <p className="mb-4">
        Together, let's create something amazing!
      </p>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
);
  
}

export default aboutPage