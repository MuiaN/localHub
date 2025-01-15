import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboardLayout } from './components/admin/AdminDashboardLayout';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ClientDashboardLayout } from './components/client/ClientDashboardLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminTransactionsPage } from './pages/admin/AdminTransactionsPage';
import { AdminBusinessesPage } from './pages/admin/AdminBusinessesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { ClientDashboardPage } from './pages/client/ClientDashboardPage';
import { BrowsePage } from './pages/client/BrowsePage';
import { ClientBookingsPage } from './pages/client/ClientBookingsPage';
import { ClientOrdersPage } from './pages/client/ClientOrdersPage';
import { PaymentsPage } from './pages/client/PaymentsPage';
import { FavoritesPage } from './pages/client/FavoritesPage';
import { AddressesPage } from './pages/client/AddressesPage';
import { ProfilePage } from './pages/client/ProfilePage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { UserTypeSelectionPage } from './pages/auth/UserTypeSelectionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useAuthStore } from './store/auth';

export default function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/select-type" element={<UserTypeSelectionPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <AdminDashboardLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="transactions" element={<AdminTransactionsPage />} />
          <Route path="businesses" element={<AdminBusinessesPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Protected client/buyer routes */}
        <Route 
          path="/client/*" 
          element={
            isAuthenticated && user?.role === 'customer' ? (
              <ClientDashboardLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<ClientDashboardPage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="bookings" element={<ClientBookingsPage />} />
          <Route path="orders" element={<ClientOrdersPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="addresses" element={<AddressesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Protected seller/provider routes */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated && user?.role === 'provider' ? (
              <DashboardLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}