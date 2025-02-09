import React, { useState } from 'react';
import { Home, Building, Search, Settings, Menu, X, Eye, Edit3, Trash2, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserListing } from '../../pages/DashboardPage/types';

interface MobileViewProps {
  listings: UserListing[];
  onAddListing: () => void;
  onAddRequest: () => void;
}

const MobileView: React.FC<MobileViewProps> = ({ listings, onAddListing, onAddRequest }) => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Accueil', path: '/dashboard' },
    { icon: Building, label: 'Mes annonces', path: '/dashboard/listings' },
    { icon: Search, label: 'Mes demandes', path: '/dashboard/requests' },
    { icon: Settings, label: 'Paramètres', path: '/settings' }
  ];

  return (
    <div className="lg:hidden">
      {/* Header mobile */}
      <div className="fixed top-16 left-0 right-0 z-20 bg-white border-b px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Tableau de bord</h1>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {showMenu && (
        <div className="fixed inset-0 top-32 bg-white z-10">
          <nav className="px-4 py-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Contenu principal */}
      <div className="pt-24 px-4 pb-20">
        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={onAddListing}
            className="p-4 bg-red-600 text-white rounded-lg text-center"
          >
            <Building className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm">Publier une annonce</span>
          </button>
          <button
            onClick={onAddRequest}
            className="p-4 bg-blue-600 text-white rounded-lg text-center"
          >
            <Search className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm">Publier une demande</span>
          </button>
        </div>

        {/* Informations du compte */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Informations du compte</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Nom complet</span>
              <span className="font-medium">Muster Keyhome24</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">muster@keyhome24.com</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Téléphone</span>
              <span className="font-medium">+41••••••••••</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Annonces actives</span>
              <span className="font-medium">{listings.length}</span>
            </div>
          </div>
        </div>

        {/* Liste des annonces */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Mes annonces récentes</h2>
          {listings.map((listing) => (
            <div 
              key={listing.id}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex gap-4">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{listing.title}</h3>
                  <p className="text-sm text-gray-600">{listing.location}</p>
                  <p className="text-red-600 font-medium mt-1">{listing.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      listing.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {listing.status === 'active' ? 'Active' : 'En attente'}
                    </span>
                    <span className="text-sm text-gray-500">{listing.views} vues</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileView;