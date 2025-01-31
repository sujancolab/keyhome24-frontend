import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteUserModalProps {
  user: {
    name: string;
    email: string;
    properties: number;
  };
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ user, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center gap-4 mb-4 text-red-600">
          <AlertTriangle className="h-8 w-8" />
          <h3 className="text-xl font-bold">Supprimer l'utilisateur</h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Êtes-vous sûr de vouloir supprimer le compte de <strong>{user.name}</strong> ({user.email}) ?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium mb-2">Cette action entraînera :</p>
            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
              <li>La suppression définitive du compte utilisateur</li>
              <li>La suppression de toutes ses annonces ({user.properties})</li>
              <li>La suppression de toutes ses demandes de recherche</li>
              <li>La suppression de son historique et de ses données</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;