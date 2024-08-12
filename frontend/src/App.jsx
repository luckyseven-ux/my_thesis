import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import GoogleLoginPage from './test/GoogleLoginPage';
import HistoryLoginPage from './pages/HistoryLoginPage';
import HistoryRecordPage from './pages/HistoryRecordPage';
import UserDataPage from './pages/UserDataPage';
import TestRecordPage from './pages/TestRecordPage';
import FeedbackPage from './pages/FeedbackPage';
import AboutPage from './pages/aboutPage';
import BlogPage from './pages/BlogPage';
import { ThemeProvider } from './global/ThemeContext';
function App() {
  
  return (
    <ThemeProvider>
      
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/reset/:token" element={<ResetPasswordPage />} />
        <Route path="/auth" element={<GoogleLoginPage />} />
        <Route path="/history-login" element={<HistoryLoginPage />} />
        <Route path="/history-record" element={<HistoryRecordPage />} />
        <Route path="/datauser" element={<UserDataPage />} />
        <Route path="/test" element={<TestRecordPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
