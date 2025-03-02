import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThemesPage from './pages/ThemesPage';
import ThemeDetailPage from './pages/ThemeDetailPage';
import EditorPage from './pages/EditorPage';
import DashboardPage from './pages/DashboardPage';
import ContactForm from './pages/Contact'; 

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminThemesPage from './pages/admin/AdminThemesPage';
import AdminRevenuePage from './pages/admin/AdminRevenuePage';

// External Projects
const ExternalProject = ({ url }: { url: string }) => {
  React.useEffect(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);
  return <Navigate to="/" />;
};

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: JSX.Element, requireAdmin?: boolean }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/themes" element={<ThemesPage />} />
        <Route path="/themes/:id" element={<ThemeDetailPage />} />
        <Route path="/contact" element={<ContactForm />} />

        {/* External Projects */}
        <Route path="/CHATBOX" element={<ExternalProject url="http://localhost:3001" />} />
        <Route path="/TEMPGEN" element={<ExternalProject url="http://localhost:8080" />} />
        <Route path="/canva-clone-react-cesdk-main" element={<ExternalProject url="http://localhost:4000" />} />

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/themes"
          element={
            <ProtectedRoute requireAdmin>
              <AdminThemesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/revenue"
          element={
            <ProtectedRoute requireAdmin>
              <AdminRevenuePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
