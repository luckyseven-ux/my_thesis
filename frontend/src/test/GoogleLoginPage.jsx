import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleLoginPage() {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/google/callback', {
        token: credentialResponse.credential,
      });

      if (response.data.user) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        console.error('Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="1029364454690-gvv235i6jbdl9cv6lqq4qqjubuoo2aek.apps.googleusercontent.com">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 via-green-800 to-blue-900">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Google Login</h1>
          <div className="flex items-center justify-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginPage;
