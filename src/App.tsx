import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PropertiesPage from "./pages/PropertiesPage";
import RequestsPage from "./pages/RequestsPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import AuthPage from "./pages/AuthPage";
import SearchRequestsPage from "./pages/SearchRequestsPage";
//import SettingsPage from './pages/SettingsPage';
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import TermsPage from "./pages/LegalPages/TermsPage";
import PrivacyPage from "./pages/LegalPages/PrivacyPage";
import ImprintPage from "./pages/LegalPages/ImprintPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPassword from "./pages/ResetPassword";

import SuccessPaymentPage from "./pages/SuccessPaymentPage";
import CancelPaymentPage from "./pages/CancelPaymentPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<PropertiesPage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/imprint" element={<ImprintPage />} />
                <Route path="/auth/reset-password/:id" element={<ResetPassword />}/>
                <Route
                    path="/success/:sessionId"
                    element={<SuccessPaymentPage />}
                />
                <Route path="/cancel" element={<CancelPaymentPage />} />

                {/* Routes protégées utilisateur */}
                <Route
                    path="/dashboard/*"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />

                {/* Routes protégées admin */}
                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute requireAdmin={true}>
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />

                {/*<Route 
          path="/settings" 
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />*/}

                {/* Redirection par défaut */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
