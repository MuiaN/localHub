import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LandingPage } from './pages/LandingPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ServicesPage from './pages/dashboard/ServicesPage';
import CustomersPage from './pages/dashboard/CustomersPage';
import BusinessProfilePage from './pages/dashboard/BusinessProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import BookingsPage from './pages/dashboard/BookingsPage';
import { AuthGuard } from './components/auth/AuthGuard';
import DashboardLayout from './components/dashboard/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
          <Route index element={<DashboardPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="profile" element={<BusinessProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Redirect all other routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;