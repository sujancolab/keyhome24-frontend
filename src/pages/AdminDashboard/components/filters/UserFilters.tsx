import React from 'react';

interface UserFiltersProps {
  filters: {
    role: string;
    status: string;
    location: string;
    propertiesMin: string;
    propertiesMax: string;
  };
  onChange: (key: string, value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ filters, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rôle
        </label>
        <select
          value={filters.role}
          onChange={(e) => onChange('role', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="">Tous les rôles</option>
          <option value="Agent Premium">Agent Premium</option>
          <option value="Agent">Agent</option>
          <option value="Utilisateur">Utilisateur</option>
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
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="pending">En attente</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Canton
        </label>
        <select
          value={filters.location}
          onChange={(e) => onChange('location', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="">Tous les cantons</option>
          <option value="VD">Vaud</option>
          <option value="GE">Genève</option>
          <option value="VS">Valais</option>
          <option value="NE">Neuchâtel</option>
          <option value="FR">Fribourg</option>
          <option value="BE">Berne</option>
          <option value="ZH">Zürich</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre d'annonces (min)
        </label>
        <input
          type="number"
          value={filters.propertiesMin}
          onChange={(e) => onChange('propertiesMin', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre d'annonces (max)
        </label>
        <input
          type="number"
          value={filters.propertiesMax}
          onChange={(e) => onChange('propertiesMax', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          min="0"
        />
      </div>
    </div>
  );
};

export default UserFilters;