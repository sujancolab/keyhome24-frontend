import React from 'react';

interface PropertyFiltersProps {
  filters: {
    type: string;
    status: string;
    location: string;
    priceMin: string;
    priceMax: string;
    dateFrom: string;
    dateTo: string;
  };
  onChange: (key: string, value: string) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ filters, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type de bien
        </label>
        <select
          value={filters.type}
          onChange={(e) => onChange('type', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="">Tous les types</option>
          <option value="Appartement">Appartement</option>
          <option value="Villa">Villa</option>
          <option value="Maison">Maison</option>
          <option value="Studio">Studio</option>
          <option value="Loft">Loft</option>
          <option value="Chalet">Chalet</option>
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
          <option value="active">Active</option>
          <option value="pending">En attente</option>
          <option value="rejected">Refusée</option>
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
          Prix minimum (CHF)
        </label>
        <input
          type="number"
          value={filters.priceMin}
          onChange={(e) => onChange('priceMin', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prix maximum (CHF)
        </label>
        <input
          type="number"
          value={filters.priceMax}
          onChange={(e) => onChange('priceMax', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date de création (de)
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
          Date de création (à)
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

export default PropertyFilters;