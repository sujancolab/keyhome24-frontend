import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';

interface DashboardSidebarProps {
  onClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    window.location.href = '/auth';
  };

  return (
    <div className="w-full lg:w-64 space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        {/* Profil utilisateur */}
        <div className="flex items-center space-x-3 mb-6 p-2 rounded-lg bg-gray-50">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.role}</p>
          </div>
        </div>
        
        {/* Menu de navigation */}
        <nav className="space-y-1">
          <Link
            to="/dashboard"
            onClick={onClose}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              currentPath === '/dashboard'
                ? 'bg-red-50 text-red-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Tableau de bord</span>
          </Link>

          {/* Bouton de déconnexion */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;