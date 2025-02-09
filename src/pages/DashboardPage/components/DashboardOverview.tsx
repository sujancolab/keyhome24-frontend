import React, { useState } from 'react';
import { UserListing } from '../types';
import { Upload, Search, Save, X, Eye, EyeOff, Home, Users } from 'lucide-react';

interface DashboardOverviewProps {
  userListings: UserListing[];
  requests: any[];
  onAddListing: () => void;
  onAddRequest: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userListings,
  requests,
  onAddListing,
  onAddRequest
}) => {
  return (
    <div className="space-y-8">
      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Publier une annonce */}
        <div className="bg-red-600 rounded-xl p-6 text-white">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2">Publier une annonce</h2>
            <p className="text-red-100 mb-4">Créez une annonce attractive pour votre bien</p>
            <button
              onClick={onAddListing}
              className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors inline-flex items-center self-start"
            >
              <Upload className="h-5 w-5 mr-2" />
              Ajouter une annonce
            </button>
          </div>
        </div>

        {/* Publier une demande */}
        <div className="bg-blue-600 rounded-xl p-6 text-white">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2">Publier une demande</h2>
            <p className="text-blue-100 mb-4">Créez une demande pour trouver votre bien idéal</p>
            <button
              onClick={onAddRequest}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center self-start"
            >
              <Search className="h-5 w-5 mr-2" />
              Publier une demande
            </button>
          </div>
        </div>
      </div>

      {/* Informations du compte */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Informations du compte</h2>
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
            <span className="font-medium">{userListings.length}</span>
          </div>
        </div>
      </div>

      {/* Liste des annonces */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Mes annonces</h2>
        <div className="space-y-4">
          {userListings.map((listing) => (
            <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium">{listing.title}</h3>
                  <p className="text-sm text-gray-600">{listing.location}</p>
                  <p className="text-red-600 font-medium">{listing.price}</p>
                  <div className="flex items-center gap-2 mt-1">
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

      {/* Liste des demandes */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Mes demandes</h2>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{request.title}</h3>
                <p className="text-sm text-gray-600">
                  {request.location.city}, {request.location.canton}
                </p>
                <p className="text-blue-600 font-medium">{request.budget} CHF/mois</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    request.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status === 'active' ? 'Active' : 'En attente'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;