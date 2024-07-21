import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true)
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
  if (isLoading) {
    return <div>Loading...</div>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('User is not authenticated');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/feedback', {
        feedback,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Feedback submitted successfully');
        setFeedback('');
      } else {
        setErrorMessage('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage('An error occurred while submitting feedback');
    }
  };
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
    <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center  p-4" style={{ backgroundImage: "url('./src/img/bg.jpg')" }}>
      <div className="bg-emerald-500 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">Submit Your Feedback</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <textarea
              className="w-full p-3 bg-white rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-green-500"
              rows="5"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-400 hover:bg-emerald-600 text-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500"
          >
            Submit Feedback
          </button>
        </form>
        {successMessage && <p className="text-green-400 mt-4 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-400 mt-4 text-center">{errorMessage}</p>}
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 w-full py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-green-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
