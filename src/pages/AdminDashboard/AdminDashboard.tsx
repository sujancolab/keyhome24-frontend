import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAdminError } from '../../hooks/useAdminError';
import AdminErrorBoundary from '../../components/admin/ErrorBoundary';
import ErrorAlert from '../../components/admin/ErrorAlert';
import AdminSidebar from './components/AdminSidebar';
import AdminOverview from './components/AdminOverview';
import UsersManagement from './components/UsersManagement';
import PropertiesManagement from './components/PropertiesManagement';
import RequestsManagement from './components/RequestsManagement';
import SubscriptionPlansManagement from './components/SubscriptionPlansManagement';
import AdminProfile from './components/AdminProfile';
import AdminSettings from './components/AdminSettings';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const { errors, addError, removeError } = useAdminError();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== 'Administrateur') {
    addError('PERMISSION_ERROR', 'Accès non autorisé', 'Seul l\'administrateur peut accéder à cette interface');
    return <Navigate to="/" replace />;
  }

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    addError('VALIDATION_ERROR', error.message, errorInfo.componentStack);
  };

  return (
    <AdminErrorBoundary onError={handleError}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Affichage des erreurs */}
          {errors.length > 0 && (
            <div className="mb-6 space-y-4">
              {errors.map((error, index) => (
                <ErrorAlert
                  key={index}
                  type={error.type}
                  message={error.message}
                  details={error.details}
                  onClose={() => removeError(index)}
                />
              ))}
            </div>
          )}

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Menu latéral */}
            <div className={`lg:col-span-1 ${showMobileSidebar ? 'block' : 'hidden lg:block'}`}>
              <AdminSidebar onClose={() => setShowMobileSidebar(false)} />
            </div>

            {/* Zone principale */}
            <div className="lg:col-span-3">
              <Routes>
                <Route path="/" element={<AdminOverview />} />
                <Route path="/users" element={<UsersManagement />} />
                <Route path="/properties" element={<PropertiesManagement />} />
                <Route path="/requests" element={<RequestsManagement />} />
                <Route path="/subscriptions" element={<SubscriptionPlansManagement />} />
                <Route path="/profile" element={<AdminProfile />} />
                <Route path="/settings" element={<AdminSettings />} />
              </Routes>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </AdminErrorBoundary>
  );
};

export default AdminDashboard;