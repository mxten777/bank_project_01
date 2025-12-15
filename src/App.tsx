import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WhiteLabelProvider } from './context/WhiteLabelContext';
import { ToastProvider } from './context/ToastContext';

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Notices from './pages/Notices';
import About from './pages/About';
import Inquiry from './pages/Inquiry';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNotices from './pages/admin/AdminNotices';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminSettings from './pages/admin/AdminSettings';

// Error Pages
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('admin-logged-in') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <WhiteLabelProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  <Home />
                </main>
              <Footer />
            </div>
          } />
          
          <Route path="/services" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Services />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/notices" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Notices />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/about" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <About />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/inquiry" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Inquiry />
              </main>
              <Footer />
            </div>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="notices" element={<AdminNotices />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* 404 Not Found - 모든 라우트 마지막에 배치 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ToastProvider>
    </WhiteLabelProvider>
  );
}

export default App;
