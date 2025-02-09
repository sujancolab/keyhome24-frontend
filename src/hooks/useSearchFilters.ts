import { useState, useEffect, useCallback } from 'react';
import { Property } from '../types/property';

interface SearchFilters {
  searchType: 'buy' | 'rent';
  location?: string;
  priceMax?: number;
  propertyType?: string;
  rooms?: number;
}

const FILTERS_STORAGE_KEY = 'propertySearchFilters';

export function useSearchFilters(initialProperties: Property[]) {
  // Charger les filtres depuis le localStorage ou utiliser les valeurs par défaut
  const [filters, setFilters] = useState<SearchFilters>(() => {
    const savedFilters = localStorage.getItem(FILTERS_STORAGE_KEY);
    return savedFilters ? JSON.parse(savedFilters) : {
      searchType: 'rent',
      location: '',
      priceMax: undefined,
      propertyType: '',
      rooms: undefined
    };
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Sauvegarder les filtres dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const handleFilterChange = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const handleSearchTypeChange = useCallback((type: 'buy' | 'rent') => {
    setFilters(prev => ({
      ...prev,
      searchType: type,
      // Réinitialiser les autres filtres lors du changement de type
      location: '',
      priceMax: undefined,
      propertyType: '',
      rooms: undefined
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchType: filters.searchType, // Garder le type de recherche actuel
      location: '',
      priceMax: undefined,
      propertyType: '',
      rooms: undefined
    });
    setSearchTerm('');
    setSortBy('newest');
  }, [filters.searchType]);

  // Filtrer les propriétés
  const filteredProperties = initialProperties.filter(property => {
    // Filtre par type de transaction
    if (property.transactionType !== filters.searchType) return false;

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

  return {
    filters,
    searchTerm,
    sortBy,
    filteredProperties,
    handleFilterChange,
    handleSearchTypeChange,
    setSearchTerm,
    setSortBy,
    clearFilters
  };
}

export default useSearchFilters;