import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore, initializeAuth } from './store/authStore';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import ContactSubmissions from './pages/ContactSubmissions';
import Users from './pages/Users';
import Subscriptions from './pages/Subscriptions';
import ManageNews from './pages/ManageNews';
import ManageCareers from './pages/ManageCareers';
import ManageHero from './pages/ManageHero';
import ManageCompanyInfo from './pages/ManageCompanyInfo';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode, roles?: string[] }> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {

  useEffect(() => {
    // Initialize auth state from localStorage
    initializeAuth();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="products"
            element={
              <ProtectedRoute roles={['owner', 'admin', 'content-manager']}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute roles={['owner', 'admin']}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="customers"
            element={
              <ProtectedRoute roles={['owner', 'admin']}>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <ProtectedRoute roles={['owner', 'admin']}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute roles={['owner', 'admin']}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="contact-submissions"
            element={
              <ProtectedRoute roles={['owner', 'admin', 'content-manager']}>
                <ContactSubmissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute roles={['owner', 'admin']}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="subscriptions"
            element={
              <ProtectedRoute roles={['owner', 'admin', 'content-manager']}>
                <Subscriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="news"
            element={
              <ProtectedRoute roles={['owner', 'admin', 'content-manager']}>
                <ManageNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="careers"
            element={
              <ProtectedRoute roles={['owner', 'admin', 'hr']}>
                <ManageCareers />
              </ProtectedRoute>
            }
          />
          <Route
            path="hero"
            element={
              <ProtectedRoute roles={['owner', 'admin']}>
                <ManageHero />
              </ProtectedRoute>
            }
          />
          <Route
            path="company-info"
            element={
              <ProtectedRoute roles={['owner', 'admin']}>
                <ManageCompanyInfo />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
