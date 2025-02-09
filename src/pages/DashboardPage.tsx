import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Upload, Search, Edit3, Eye, Trash2, Home } from 'lucide-react';
import PropertyListingForm from '../components/PropertyListingForm/PropertyListingForm';
import SearchRequestForm from '../components/SearchRequestForm/SearchRequestForm';

const userListings = [
  {
    id: '1',
    title: 'Appartement 3.5 pièces avec balcon',
    location: 'Lausanne, Vaud',
    price: '450,000 CHF',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    views: 245,
    status: 'active',
    hasBeenEdited: false
  },
  {
    id: '2',
    title: 'Studio meublé centre-ville',
    location: 'Genève, Genève',
    price: '850 CHF/mois',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    views: 127,
    status: 'pending',
    hasBeenEdited: false
  }
];

const DashboardPage = () => {
  const [showAddListing, setShowAddListing] = useState(false);
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleDeleteListing = (listing) => {
    setSelectedListing(listing);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">Jean Dupont</h3>
                  <p className="text-sm text-gray-600">Agent Immobilier</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg bg-red-50 text-red-600">
                  <Home className="h-5 w-5" />
                  <span>Tableau de bord</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {showAddListing ? (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <button
                  onClick={() => setShowAddListing(false)}
                  className="mb-6 text-gray-600 hover:text-gray-900"
                >
                  ← Retour
                </button>
                <h2 className="text-2xl font-bold mb-6">Publier une annonce</h2>
                <PropertyListingForm />
              </div>
            ) : showAddRequest ? (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <button
                  onClick={() => setShowAddRequest(false)}
                  className="mb-6 text-gray-600 hover:text-gray-900"
                >
                  ← Retour
                </button>
                <h2 className="text-2xl font-bold mb-6">Publier une demande</h2>
                <SearchRequestForm />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Publier une annonce */}
                  <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold mb-2">Publier une annonce</h2>
                        <p className="text-red-100 mb-4">
                          Créez une annonce attractive pour votre bien
                        </p>
                        <button
                          onClick={() => setShowAddListing(true)}
                          className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-all transform hover:scale-105 flex items-center font-semibold shadow-md"
                        >
                          <Upload className="h-5 w-5 mr-2" />
                          Ajouter une annonce
                        </button>
                      </div>
                      <Upload className="h-12 w-12 text-red-200" />
                    </div>
                  </div>

                  {/* Publier une demande */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold mb-2">Publier une demande</h2>
                        <p className="text-blue-100 mb-4">
                          Créez une demande pour trouver votre bien idéal
                        </p>
                        <button
                          onClick={() => setShowAddRequest(true)}
                          className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center font-semibold shadow-md"
                        >
                          <Search className="h-5 w-5 mr-2" />
                          Publier une demande
                        </button>
                      </div>
                      <Search className="h-12 w-12 text-blue-200" />
                    </div>
                  </div>
                </div>

                {/* Listings */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Mes annonces</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {userListings.length} annonce{userListings.length > 1 ? 's' : ''} active{userListings.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {userListings.length > 0 ? (
                    <div className="grid gap-4">
                      {userListings.map(listing => (
                        <div 
                          key={listing.id} 
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{listing.title}</h3>
                            <p className="text-gray-600">{listing.location}</p>
                            <p className="text-red-600 font-medium">{listing.price}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-600">
                                {listing.views} vues
                              </span>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                listing.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {listing.status === 'active' ? 'Active' : 'En attente'}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Edit3 className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Eye className="h-5 w-5" />
                            </button>
                            <button 
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              onClick={() => handleDeleteListing(listing)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Aucune annonce pour le moment
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Commencez par créer votre première annonce
                      </p>
                      <button
                        onClick={() => setShowAddListing(true)}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Créer une annonce
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Supprimer l'annonce</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedListing(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DashboardPage;