import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Upload, Search, Edit3, Eye, Trash2, Home } from 'lucide-react';
import PropertyListingForm from '../../components/PropertyListingForm/PropertyListingForm';
import SearchRequestForm from '../../components/SearchRequestForm/SearchRequestForm';
import { sampleListings, sampleRequests } from './data/sampleData';
import ExpiredListingModal from './components/ExpiredListingModal';
import { useAuthContext } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuthContext();
  const [showAddListing, setShowAddListing] = useState(false);
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; title: string } | null>(null);
  const [selectedExpiredItem, setSelectedExpiredItem] = useState<{
    id: string;
    title: string;
    type: 'listing' | 'request';
  } | null>(null);

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  const handleItemClick = (item: any, type: 'listing' | 'request') => {
    if (isExpired(item.expiresAt)) {
      setSelectedExpiredItem({
        id: item.id,
        title: item.title,
        type
      });
      setShowExpiredModal(true);
    }
  };

  const handleRenew = () => {
    if (selectedExpiredItem?.type === 'listing') {
      setShowAddListing(true);
    } else {
      setShowAddRequest(true);
    }
    setShowExpiredModal(false);
    setSelectedExpiredItem(null);
  };

  const handleDelete = (item: { id: string; title: string }) => {
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log('Suppression de l\'élément:', selectedItem?.id);
    setShowDeleteConfirm(false);
    setSelectedItem(null);
  };

  const getStatusLabel = (status: string, expiresAt: string) => {
    if (isExpired(expiresAt)) return 'Expirée';
    return status === 'active' ? 'Active' : 'En attente';
  };

  const getStatusClasses = (status: string, expiresAt: string) => {
    if (isExpired(expiresAt)) return 'bg-red-100 text-red-800';
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec informations du compte */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.role}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Informations du compte</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Email: {user?.email}</p>
                  <p className="text-sm text-gray-600">Téléphone: {user?.phone || '+41••••••••••'}</p>
                  <p className="text-sm text-gray-600">Annonces actives: {sampleListings.filter(l => !isExpired(l.expiresAt)).length}</p>
                  <p className="text-sm text-gray-600">Demandes actives: {sampleRequests.filter(r => !isExpired(r.expiresAt)).length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3 space-y-6">
            {showAddListing ? (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <button
                    onClick={() => setShowAddListing(false)}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    ← Retour
                  </button>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Publier une annonce</h2>
                  <PropertyListingForm />
                </div>
              </div>
            ) : showAddRequest ? (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <button
                    onClick={() => setShowAddRequest(false)}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    ← Retour
                  </button>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Publier une demande</h2>
                  <SearchRequestForm />
                </div>
              </div>
            ) : (
              <>
                {/* Actions rapides */}
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

                {/* Liste des annonces */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Mes annonces</h2>
                  <div className="space-y-4">
                    {sampleListings.map((listing) => {
                      const expired = isExpired(listing.expiresAt);
                      return (
                        <div 
                          key={listing.id}
                          onClick={() => expired && handleItemClick(listing, 'listing')}
                          className={`flex items-center justify-between p-4 border rounded-lg ${
                            expired ? 'opacity-75 bg-gray-50 cursor-pointer hover:opacity-100' : 'hover:shadow-md'
                          } transition-all`}
                        >
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
                                  getStatusClasses(listing.status, listing.expiresAt)
                                }`}>
                                  {getStatusLabel(listing.status, listing.expiresAt)}
                                </span>
                                <span className="text-sm text-gray-500">{listing.views} vues</span>
                                {expired && (
                                  <span className="text-sm text-red-600">
                                    Expirée le {new Date(listing.expiresAt).toLocaleDateString('fr-CH')}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {!expired && (
                            <div className="flex flex-col gap-2">
                              <button 
                                onClick={() => handleDelete({ id: listing.id, title: listing.title })}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer l'annonce"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Liste des demandes */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Mes demandes</h2>
                  <div className="space-y-4">
                    {sampleRequests.map((request) => {
                      const expired = isExpired(request.expiresAt);
                      return (
                        <div 
                          key={request.id}
                          onClick={() => expired && handleItemClick(request, 'request')}
                          className={`p-4 border rounded-lg ${
                            expired ? 'opacity-75 bg-gray-50 cursor-pointer hover:opacity-100' : 'hover:shadow-md'
                          } transition-all`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div>
                                  <h3 className="font-medium">{request.title}</h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    {request.location.city}, {request.location.canton}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <span>{request.budget}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    getStatusClasses(request.status, request.expiresAt)
                                  }`}>
                                    {getStatusLabel(request.status, request.expiresAt)}
                                  </span>
                                </div>
                                {expired && (
                                  <span className="text-sm text-red-600">
                                    Expirée le {new Date(request.expiresAt).toLocaleDateString('fr-CH')}
                                  </span>
                                )}
                              </div>
                            </div>

                            {!expired && (
                              <div className="flex flex-col gap-2">
                                <button 
                                  onClick={() => handleDelete({ id: request.id, title: request.title })}
                                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Supprimer la demande"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Supprimer l'élément</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer "{selectedItem.title}" ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour les éléments expirés */}
      {showExpiredModal && selectedExpiredItem && (
        <ExpiredListingModal
          item={selectedExpiredItem}
          onClose={() => {
            setShowExpiredModal(false);
            setSelectedExpiredItem(null);
          }}
          onRenew={handleRenew}
          onDelete={() => {
            setShowExpiredModal(false);
            setSelectedItem({
              id: selectedExpiredItem.id,
              title: selectedExpiredItem.title
            });
            setShowDeleteConfirm(true);
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default DashboardPage;