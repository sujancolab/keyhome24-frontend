import React from 'react';
import { MapPin, ChevronRight, X, Calendar, ChfIcon } from 'lucide-react';

interface RequestViewModalProps {
  request: {
    id: number;
    title: string;
    type: string;
    user: string;
    budget: string;
    status: string;
    createdAt: string;
    location: string;
    rooms: string;
    description?: string;
  };
  onClose: () => void;
  onEdit: () => void;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
}

const RequestViewModal: React.FC<RequestViewModalProps> = ({
  request,
  onClose,
  onEdit,
  onApprove,
  onReject,
  onDelete
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'location':
        return 'Location';
      case 'colocation':
        return 'Colocation';
      case 'reprise':
        return 'Reprise de bail';
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Détails de la demande</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* En-tête */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{request.title}</h4>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{request.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{request.budget}</div>
                <span className={`inline-flex px-2 py-1 rounded-full text-sm ${
                  request.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : request.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              </div>
            </div>
          </div>

          {/* Détails */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <span className="font-medium text-gray-700">Type de demande:</span>
              <span className="ml-2">{getTypeLabel(request.type)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Nombre de pièces:</span>
              <span className="ml-2">{request.rooms}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Utilisateur:</span>
              <span className="ml-2">{request.user}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Date de création:</span>
              <span className="ml-2">{request.createdAt}</span>
            </div>
          </div>

          {/* Description */}
          {request.description && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-2">Description</h5>
              <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                {request.description}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="border-t pt-6 flex flex-wrap gap-4">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Modifier
            </button>
            {request.status === 'pending' && (
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

export default RequestViewModal;