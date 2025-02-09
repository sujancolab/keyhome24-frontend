import { useState, useCallback, useMemo } from 'react';
import { Property } from '../types/property';

interface SearchFilters {
  location?: string;
  priceMax?: number;
  propertyType?: string;
  rooms?: number;
}

export function useSearchFilters(initialProperties: Property[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState('newest');

  const filteredProperties = useMemo(() => {
    return initialProperties.filter(property => {
      // Recherche textuelle
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          property.title.toLowerCase().includes(searchLower) ||
          property.location.city.toLowerCase().includes(searchLower) ||
          property.location.npa.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Filtres
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        const matchesLocation = 
          property.location.city.toLowerCase().includes(locationLower) ||
          property.location.npa.toLowerCase().includes(locationLower);
        
        if (!matchesLocation) return false;
      }

      if (filters.priceMax && property.price > filters.priceMax) {
        return false;
      }

      if (filters.propertyType && property.type !== filters.propertyType) {
        return false;
      }

      if (filters.rooms && property.rooms !== filters.rooms) {
        return false;
      }

      return true;
    }).sort((a, b) => {
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
  }, [initialProperties, searchTerm, filters, sortBy]);

  const handleFilterChange = useCallback((newFilters: SearchFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
    setSortBy('newest');
  }, []);

  return {
    filteredProperties,
    searchTerm,
    filters,
    sortBy,
    handleFilterChange,
    handleSearchChange,
    handleSortChange,
    clearFilters
  };
}

export default useSearchFilters;