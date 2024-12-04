import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AuthGuard } from './components/auth/AuthGuard';

// Lazy load pages
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const DashboardLayout = React.lazy(() => import('./components/dashboard/DashboardLayout'));
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const ServicesPage = React.lazy(() => import('./pages/dashboard/ServicesPage'));
const BookingsPage = React.lazy(() => import('./pages/dashboard/BookingsPage'));
const CustomersPage = React.lazy(() => import('./pages/dashboard/CustomersPage'));
const BusinessProfilePage = React.lazy(() => import('./pages/dashboard/BusinessProfilePage'));
const SettingsPage = React.lazy(() => import('./pages/dashboard/SettingsPage'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center text-gray-600">Loading...</div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <main className="flex-grow">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                        Welcome to LocalHub
                      </h1>
                      <p className="text-xl text-center text-gray-600">
                        Your neighborhood services, all in one place.
                      </p>
                    </div>
                  </main>
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <DashboardLayout />
                </AuthGuard>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="business" element={<BusinessProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}