import React from 'react';
import { UserListing } from '../types';
import { Upload, Search } from 'lucide-react';

interface DashboardHomeProps {
  listings: UserListing[];
  requests: any[];
  onAddListing: () => void;
  onAddRequest: () => void;
  onDeleteListing: (id: string) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({
  listings,
  requests,
  onAddListing,
  onAddRequest
}) => {
  // Créer un tableau d'informations du compte avec des IDs uniques
  const accountInfo = [
    { id: 'account-name', label: 'Nom complet', value: 'Muster Keyhome24' },
    { id: 'account-email', label: 'Email', value: 'muster@keyhome24.com' },
    { id: 'account-phone', label: 'Téléphone', value: '+41••••••••••' },
    { id: 'account-listings', label: 'Nombre d\'annonces actives', value: listings.length.toString() }
  ];

  return (
    <div className="space-y-8">
      {/* Section Publier une annonce */}
      <div className="bg-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Publier une annonce</h2>
            <p className="text-red-100 mb-6">
              Créez une annonce attractive pour votre bien
            </p>
            <button
              onClick={onAddListing}
              className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors inline-flex items-center"
            >
              <Upload className="h-5 w-5 mr-2" />
              Ajouter une annonce
            </button>
          </div>
        </div>
      </div>

      {/* Section Publier une demande */}
      <div className="bg-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Publier une demande</h2>
            <p className="text-blue-100 mb-6">
              Créez une demande pour trouver votre bien idéal
            </p>
            <button
              onClick={onAddRequest}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Publier une demande
            </button>
          </div>
        </div>
      </div>

      {/* Informations du compte */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Informations de votre Compte</h2>
        <p className="text-gray-600 mb-6">Détails de votre compte et de vos annonces</p>
        
        <table className="w-full">
          <tbody>
            {accountInfo.map(info => (
              <tr key={info.id} className={info.id !== 'account-listings' ? 'border-b' : ''}>
                <td className="py-3 text-sm text-gray-600">{info.label}</td>
                <td className="py-3 font-medium">{info.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Liste des annonces */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Mes annonces</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">TITRE</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">TYPE</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">PRIX</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">EXPIRATION</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">STATUT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {listings.map(listing => (
              <tr key={`listing-${listing.id}`} className="hover:bg-gray-50">
                <td className="py-4 px-4">{listing.title}</td>
                <td className="py-4 px-4">residential</td>
                <td className="py-4 px-4">{listing.price}</td>
                <td className="py-4 px-4">08/12/2025</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    listing.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {listing.status === 'active' ? 'Payé' : 'En attente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Liste des demandes */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Mes demandes</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">TITRE</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">TYPE</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">PRIX</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">EXPIRATION</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">STATUT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map(request => (
              <tr key={`request-${request.id}`} className="hover:bg-gray-50">
                <td className="py-4 px-4">{request.title}</td>
                <td className="py-4 px-4">{request.type}</td>
                <td className="py-4 px-4">{request.budget} CHF</td>
                <td className="py-4 px-4">08/12/2025</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    request.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status === 'active' ? 'Payé' : 'En attente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;