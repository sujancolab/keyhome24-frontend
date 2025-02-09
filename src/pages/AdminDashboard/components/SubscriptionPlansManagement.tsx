import React, { useState } from 'react';
import { Plus, Edit2, Trash2, AlertCircle, Save, Building, Search } from 'lucide-react';
import { useSubscriptionPlans, SubscriptionPlan } from '../../../hooks/useSubscriptionPlans';

const SubscriptionPlansManagement = () => {
  const { plans: allPlans, loading, updatePlans } = useSubscriptionPlans();
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'property' | 'request'>('property');
  const [formError, setFormError] = useState('');

  const filteredPlans = allPlans.filter(plan => plan.type === selectedType);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString() || '';
    const duration = Number(formData.get('duration'));
    const price = Number(formData.get('price'));
    const description = formData.get('description')?.toString() || '';
    const features = formData.get('features')?.toString().split('\n').filter(Boolean) || [];

    // Validation
    if (!name || !duration || !price || !description || features.length === 0) {
      setFormError('Tous les champs sont obligatoires');
      return;
    }

    if (duration < 1) {
      setFormError('La durée doit être supérieure à 0');
      return;
    }

    if (price < 0) {
      setFormError('Le prix ne peut pas être négatif');
      return;
    }

    try {
      const newPlan: SubscriptionPlan = {
        id: editingPlan?.id || `${selectedType}-${Date.now()}`,
        name,
        duration,
        price,
        description,
        features,
        type: selectedType
      };

      const updatedPlans = editingPlan
        ? allPlans.map(p => p.id === editingPlan.id ? newPlan : p)
        : [...allPlans, newPlan];

      await updatePlans(updatedPlans);
      setEditingPlan(null);
      setFormError('');
    } catch (error) {
      console.error('Error saving plan:', error);
      setFormError('Une erreur est survenue lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const updatedPlans = allPlans.filter(p => p.id !== id);
      await updatePlans(updatedPlans);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting plan:', error);
      setFormError('Une erreur est survenue lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Offres de publication</h2>
        <button
          onClick={() => setEditingPlan({ 
            id: '', 
            name: '', 
            duration: 30,
            price: 0,
            description: '',
            features: [],
            type: selectedType
          })}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle offre
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedType('property')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            selectedType === 'property'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Building className="h-5 w-5 mr-2" />
          Annonces
        </button>
        <button
          onClick={() => setSelectedType('request')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            selectedType === 'request'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Search className="h-5 w-5 mr-2" />
          Demandes
        </button>
      </div>

      {formError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {formError}
        </div>
      )}

      {editingPlan ? (
        <form onSubmit={handleSave} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'offre *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={editingPlan.name}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée (jours) *
              </label>
              <input
                type="number"
                name="duration"
                defaultValue={editingPlan.duration}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix (CHF) *
              </label>
              <input
                type="number"
                name="price"
                defaultValue={editingPlan.price}
                step="0.05"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <input
                type="text"
                name="description"
                defaultValue={editingPlan.description}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fonctionnalités (une par ligne) *
            </label>
            <textarea
              name="features"
              defaultValue={editingPlan.features.join('\n')}
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setEditingPlan(null)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
            >
              <Save className="h-5 w-5 mr-2" />
              Enregistrer
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(plan.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600">{plan.description}</p>
              
              <div className="py-4 border-t border-b">
                <p className="text-2xl font-bold">{plan.price.toFixed(2)} CHF</p>
                <p className="text-sm text-gray-600">{plan.duration} jours</p>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Supprimer l'offre</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlansManagement;