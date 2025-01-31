import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { UserListing } from '../types';

interface EditListingModalProps {
  listing: UserListing;
  onClose: () => void;
  onSave: (id: string, data: Partial<UserListing>) => void;
}

const EditListingModal: React.FC<EditListingModalProps> = ({ listing, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: listing.title,
    description: listing.description || '',
    price: listing.price.replace(/[^\d]/g, ''),
    location: listing.location
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(listing.id, {
      ...formData,
      price: `${parseInt(formData.price).toLocaleString('fr-CH')} CHF`
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900">Modifier l'annonce</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix (CHF)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localisation
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Save className="h-5 w-5 mr-2" />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingModal;