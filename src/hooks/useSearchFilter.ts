import { useState, useCallback, useMemo } from 'react';

interface UseSearchFilterConfig<T, F> {
  items: T[];
  initialFilters: F;
  filterFn: (item: T, filters: F) => boolean;
  searchFn?: (item: T, term: string) => boolean;
}

export function useSearchFilter<T, F>({
  items,
  initialFilters,
  filterFn,
  searchFn = (item: T, term: string) => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(term.toLowerCase())
    )
}: UseSearchFilterConfig<T, F>) {
  const [filters, setFilters] = useState<F>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = useCallback((key: keyof F, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
  }, [initialFilters]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = searchTerm === '' || searchFn(item, searchTerm);
      const matchesFilters = filterFn(item, filters);
      return matchesSearch && matchesFilters;
    });
  }, [items, searchTerm, filters, filterFn, searchFn]);

  return {
    filters,
    searchTerm,
    filteredItems,
    setSearchTerm,
    handleFilterChange,
    clearFilters
  };
}