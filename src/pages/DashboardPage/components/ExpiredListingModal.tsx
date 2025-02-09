import React from 'react';
import { Clock, RefreshCw, Trash2 } from 'lucide-react';

interface ExpiredListingModalProps {
  item: {
    id: string;
    title: string;
    type: 'listing' | 'request';
  };
  onClose: () => void;
  onRenew: () => void;
  onDelete: () => void;
}

const ExpiredListingModal: React.FC<ExpiredListingModalProps> = ({
  item,
  onClose,
  onRenew,
  onDelete
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center gap-4 text-gray-900 mb-4">
          <Clock className="h-8 w-8 text-red-600" />
          <h3 className="text-xl font-bold">Abonnement expiré</h3>
        </div>

        <p className="text-gray-600 mb-6">
          Votre {item.type === 'listing' ? 'annonce' : 'demande'} "{item.title}" a expiré. 
          Que souhaitez-vous faire ?
        </p>

        <div className="space-y-3">
          <button
            onClick={onRenew}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Renouveler l'abonnement
          </button>

          <button
            onClick={onDelete}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
            Supprimer définitivement
          </button>

          <button
            onClick={onClose}
            className="w-full px-4 py-3 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpiredListingModal;