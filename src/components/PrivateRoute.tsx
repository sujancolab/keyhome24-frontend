import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <div>Chargement...</div>;
  }

  // Redirection vers la page de connexion si non connecté
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Redirection des utilisateurs non-admin tentant d'accéder aux pages admin
  if (requireAdmin && user.role !== 'Administrateur') {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirection des admins tentant d'accéder au dashboard utilisateur
  if (!requireAdmin && user.role === 'Administrateur' && location.pathname.startsWith('/dashboard')) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;