import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Public Pages
import Home from './pages/public/Home';
import ViewSchemes from './pages/public/ViewSchemes';
import SchemeDetails from './pages/public/SchemeDetails';
import EligibilityChecker from './pages/public/EligibilityChecker';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// User Dashboard
import UserDashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import ApplyScheme from './pages/user/ApplyScheme';
import ApplicationStatus from './pages/user/ApplicationStatus';
import RecommendedSchemes from './pages/user/RecommendedSchemes';
import BookmarkedSchemes from './pages/user/BookmarkedSchemes';

// Admin Dashboard
import AdminDashboard from './pages/admin/Dashboard';
import ManageSchemes from './pages/admin/ManageSchemes';
import ViewApplications from './pages/admin/ViewApplications';
import Analytics from './pages/admin/Analytics';

import AdminLogin from './pages/public/AdminLogin';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected Public Routes - Require Login */}
                  <Route path="/schemes" element={<ProtectedRoute><ViewSchemes /></ProtectedRoute>} />
                  <Route path="/schemes/:id" element={<ProtectedRoute><SchemeDetails /></ProtectedRoute>} />
                  <Route path="/eligibility-checker" element={<ProtectedRoute><EligibilityChecker /></ProtectedRoute>} />

                  {/* User Routes */}
                  <Route path="/user/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
                  <Route path="/user/profile" element={<ProtectedRoute role="user"><Profile /></ProtectedRoute>} />
                  <Route path="/user/apply/:schemeId" element={<ProtectedRoute role="user"><ApplyScheme /></ProtectedRoute>} />
                  <Route path="/user/applications" element={<ProtectedRoute role="user"><ApplicationStatus /></ProtectedRoute>} />
                  <Route path="/user/recommended" element={<ProtectedRoute role="user"><RecommendedSchemes /></ProtectedRoute>} />
                  <Route path="/user/bookmarks" element={<ProtectedRoute role="user"><BookmarkedSchemes /></ProtectedRoute>} />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/schemes" element={<ProtectedRoute role="admin"><ManageSchemes /></ProtectedRoute>} />
                  <Route path="/admin/applications" element={<ProtectedRoute role="admin"><ViewApplications /></ProtectedRoute>} />
                  <Route path="/admin/analytics" element={<ProtectedRoute role="admin"><Analytics /></ProtectedRoute>} />
                </Routes>
              </Layout>
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
