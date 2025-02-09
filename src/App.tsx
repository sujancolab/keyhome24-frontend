import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserDashboardProvider } from './contexts/UserDashboardContext';
import { FormValidationProvider } from './contexts/FormValidationContext';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import RequestsPage from './pages/RequestsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AuthPage from './pages/AuthPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import TermsPage from './pages/LegalPages/TermsPage';
import PrivacyPage from './pages/LegalPages/PrivacyPage';
import ImprintPage from './pages/LegalPages/ImprintPage';
// import VerifyEmailPage from './pages/VerifyEmailPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <UserDashboardProvider>
          <FormValidationProvider>
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/imprint" element={<ImprintPage />} />
              
              {/* Routes protégées utilisateur */}
              <Route 
                path="/dashboard/*" 
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/settings" 
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                } 
              />

              {/* Redirection par défaut */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FormValidationProvider>
        </UserDashboardProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;