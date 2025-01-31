import React from 'react';
import { Filter } from 'lucide-react';

interface ActivityFiltersProps {
  filters: {
    type: string;
    dateFrom: string;
    dateTo: string;
    status: string;
  };
  onChange: (key: string, value: string) => void;
}

const ActivityFilters: React.FC<ActivityFiltersProps> = ({ filters, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type d'activité
        </label>
        <select
          value={filters.type}
          onChange={(e) => onChange('type', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="">Tous les types</option>
          <option value="property">Annonces</option>
          <option value="user">Utilisateurs</option>
          <option value="request">Demandes</option>
          <option value="system">Système</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Statut
        </label>
        <select
          value={filters.status}
          onChange={(e) => onChange('status', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="">Tous les statuts</option>
          <option value="success">Succès</option>
          <option value="error">Erreur</option>
          <option value="warning">Avertissement</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date de début
        </label>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onChange('dateFrom', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date de fin
        </label>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => onChange('dateTo', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );
};

export default ActivityFilters;