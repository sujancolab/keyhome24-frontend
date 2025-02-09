import React, { useState, useMemo } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../types/property';
import { properties as propertyData } from '../data/properties';

interface PropertyGridProps {
  searchType: 'buy' | 'rent';
  filters?: {
    location?: string;
    priceMax?: number;
    propertyType?: string;
    rooms?: number;
  };
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ searchType, filters }) => {
  const [sortBy, setSortBy] = useState('newest');

  // Mémoriser les propriétés filtrées
  const filteredProperties = useMemo(() => {
    let result = propertyData.filter(p => p.transactionType === searchType);

    if (filters) {
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        result = result.filter(p => 
          p.location.city.toLowerCase().includes(searchTerm) ||
          p.location.npa.includes(searchTerm)
        );
      }

      if (typeof filters.priceMax === 'number' && !isNaN(filters.priceMax)) {
        result = result.filter(p => p.price <= filters.priceMax!);
      }

      if (filters.propertyType) {
        // Convertir en minuscules pour la comparaison
        const searchType = filters.propertyType.toLowerCase();
        result = result.filter(p => p.type.toLowerCase() === searchType);
      }

      if (typeof filters.rooms === 'number' && !isNaN(filters.rooms)) {
        // Gérer les intervalles de pièces (ex: 1-1.5, 2-2.5, etc.)
        const minRooms = filters.rooms;
        const maxRooms = filters.rooms + 0.5;
        result = result.filter(p => p.rooms >= minRooms && p.rooms <= maxRooms);
      }
    }

    // Tri
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'area-desc':
          return b.area - a.area;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });
  }, [searchType, filters, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm sticky top-16 z-10">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
            {filteredProperties.length} Bien{filteredProperties.length > 1 ? 's' : ''} à {searchType === 'buy' ? 'vendre' : 'louer'}
          </h2>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-gray-100 rounded-lg appearance-none cursor-pointer hover:bg-gray-200 transition-colors pr-8"
          >
            <option value="newest">Plus récent</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="area-desc">Surface</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard 
            key={property.id}
            property={property}
          />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">
            Aucun bien ne correspond à vos critères
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(PropertyGrid);