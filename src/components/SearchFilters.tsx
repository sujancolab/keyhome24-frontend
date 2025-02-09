import React from 'react';
import { Search, Filter, Home, ArrowDown, Bed, Bath, Square, TreePine, Car, Zap } from 'lucide-react';
import ChfIcon from './ChfIcon';

interface SearchFiltersProps {
  filters: {
    priceMin?: number;
    priceMax?: number;
    rooms?: number;
    area?: number;
    features?: string[];
  };
  onFilterChange: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Prix */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Prix</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin || ''}
                onChange={(e) => onFilterChange({ ...filters, priceMin: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <ChfIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax || ''}
                onChange={(e) => onFilterChange({ ...filters, priceMax: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <ChfIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Surface */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Surface</h3>
          <div className="relative">
            <input
              type="number"
              placeholder="Surface minimum (m²)"
              value={filters.area || ''}
              onChange={(e) => onFilterChange({ ...filters, area: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <Square className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Caractéristiques */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Caractéristiques</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.features?.includes('parking')}
                onChange={(e) => {
                  const newFeatures = e.target.checked
                    ? [...(filters.features || []), 'parking']
                    : (filters.features || []).filter(f => f !== 'parking');
                  onFilterChange({ ...filters, features: newFeatures });
                }}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Place de parc</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.features?.includes('garden')}
                onChange={(e) => {
                  const newFeatures = e.target.checked
                    ? [...(filters.features || []), 'garden']
                    : (filters.features || []).filter(f => f !== 'garden');
                  onFilterChange({ ...filters, features: newFeatures });
                }}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Jardin</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;