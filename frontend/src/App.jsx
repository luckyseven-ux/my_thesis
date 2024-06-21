import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import GoogleLoginPage from './test/GoogleLoginPage';
import RecordPage from './pages/RecordPage';
import HistoryLoginPage from './pages/HistoryLoginPage';
import HistoryRecordPage from './pages/HistoryRecordPage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/reset/:token" element={<ResetPasswordPage />} />
        <Route path="/auth" element={<GoogleLoginPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/history-login" element={<HistoryLoginPage />} />
        <Route path="/history-record" element={<HistoryRecordPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
