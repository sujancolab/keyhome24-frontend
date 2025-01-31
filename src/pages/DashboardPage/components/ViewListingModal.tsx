import React from 'react';
import { X, MapPin, Eye, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserListing } from '../types';

interface ViewListingModalProps {
  listing: UserListing;
  onClose: () => void;
}

const ViewListingModal: React.FC<ViewListingModalProps> = ({ listing, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Détails de l'annonce</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Image */}
          <div className="relative h-[400px] mb-6 rounded-lg overflow-hidden">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informations principales */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{listing.title}</h4>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{listing.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{listing.price}</div>
                <span className={`inline-flex px-2 py-1 rounded-full text-sm ${
                  listing.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {listing.status === 'active' ? 'Active' : 'En attente'}
                </span>
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Eye className="h-5 w-5 mr-2" />
                <span>{listing.views} vues</span>
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="mb-6">
                <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
              </div>
            )}

            {/* Statut de modification */}
            {listing.hasBeenEdited && (
              <div className="mt-4 text-sm text-gray-600">
                Cette annonce a déjà été modifiée une fois et ne peut plus être éditée.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewListingModal;