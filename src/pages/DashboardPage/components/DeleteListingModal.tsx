import React from 'react';
import { UserListing } from '../types';

interface DeleteListingModalProps {
  listing: UserListing;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteListingModal = ({ listing, onClose, onConfirm }: DeleteListingModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Supprimer l'annonce</h3>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
        </p>
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
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteListingModal;