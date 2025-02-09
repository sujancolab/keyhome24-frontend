import { useState, useCallback } from 'react';

interface UseTableFiltersProps<T> {
  initialFilters: T;
  filterFunction: (item: any, filters: T) => boolean;
}

export function useTableFilters<T>({ initialFilters, filterFunction }: UseTableFiltersProps<T>) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = useCallback((key: keyof T, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
  }, [initialFilters]);

  const filterItems = useCallback((items: any[]) => {
    return items.filter(item => {
      // Filtre par terme de recherche
      if (searchTerm && !Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )) {
        return false;
      }

      // Filtre par critères
      return filterFunction(item, filters);
    });
  }, [searchTerm, filters, filterFunction]);

  return {
    filters,
    searchTerm,
    showFilters,
    setSearchTerm,
    setShowFilters,
    handleFilterChange,
    clearFilters,
    filterItems
  };
}