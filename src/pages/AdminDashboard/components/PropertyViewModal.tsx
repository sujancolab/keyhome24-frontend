import React from 'react';
import { MapPin, Home, Maximize, Bath, Building2, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ChfIcon from '../../../components/ChfIcon';

interface PropertyViewModalProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    owner: string;
    status: string;
    createdAt: string;
    image: string;
    views: number;
    type: string;
    description?: string;
    features?: {
      rooms?: number;
      bathrooms?: number;
      area?: number;
      floor?: number;
    };
  };
  onClose: () => void;
  onEdit: () => void;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
}

const PropertyViewModal: React.FC<PropertyViewModalProps> = ({
  property,
  onClose,
  onEdit,
  onApprove,
  onReject,
  onDelete
}) => {
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
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informations principales */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{property.title}</h4>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{property.price}</div>
                <span className={`inline-flex px-2 py-1 rounded-full text-sm ${
                  property.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : property.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {property.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {property.features?.rooms && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Home className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <span className="block font-semibold">{property.features.rooms}</span>
                  <span className="block text-sm text-gray-600">Pièces</span>
                </div>
              )}
              {property.features?.area && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Maximize className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <span className="block font-semibold">{property.features.area} m²</span>
                  <span className="block text-sm text-gray-600">Surface</span>
                </div>
              )}
              {property.features?.bathrooms && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <span className="block font-semibold">{property.features.bathrooms}</span>
                  <span className="block text-sm text-gray-600">Salle(s) de bain</span>
                </div>
              )}
              {property.features?.floor !== undefined && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Building2 className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <span className="block font-semibold">{property.features.floor}</span>
                  <span className="block text-sm text-gray-600">Étage</span>
                </div>
              )}
            </div>

            {property.description && (
              <div className="mb-6">
                <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-700">Propriétaire:</span> {property.owner}
              </div>
              <div>
                <span className="font-medium text-gray-700">Date de création:</span> {property.createdAt}
              </div>
              <div>
                <span className="font-medium text-gray-700">Vues:</span> {property.views}
              </div>
              <div>
                <span className="font-medium text-gray-700">Type:</span> {property.type}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-6 flex flex-wrap gap-4">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Modifier
            </button>
            {property.status === 'pending' && (
              <>
                <button
                  onClick={onApprove}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approuver
                </button>
                <button
                  onClick={onReject}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Refuser
                </button>
              </>
            )}
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyViewModal;