import React, { useState } from 'react';
import { FilterBar, RequestFilters } from './filters';
import { requests } from '../data/requests';
// ... (reste des imports)

const RequestsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    dateFrom: '',
    dateTo: ''
  });

  // ... (reste du state)

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      status: '',
      location: '',
      budgetMin: '',
      budgetMax: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const filteredRequests = requests.filter(request => {
    if (searchTerm && !request.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !request.user.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.type && request.type !== filters.type) return false;
    if (filters.status && request.status !== filters.status) return false;
    if (filters.location && !request.location.includes(filters.location)) return false;
    
    const budget = parseInt(request.budget.replace(/[^\d]/g, ''));
    if (filters.budgetMin && budget < parseInt(filters.budgetMin)) return false;
    if (filters.budgetMax && budget > parseInt(filters.budgetMax)) return false;
    
    if (filters.dateFrom || filters.dateTo) {
      const date = new Date(request.createdAt);
      if (filters.dateFrom && date < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && date > new Date(filters.dateTo)) return false;
    }
    
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gestion des demandes</h2>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => setShowFilters(!showFilters)}
        placeholder="Rechercher une demande..."
        showFilters={showFilters}
        onClearFilters={clearFilters}
      >
        <RequestFilters
          filters={filters}
          onChange={handleFilterChange}
        />
      </FilterBar>

      {/* ... (reste du composant) */}
    </div>
  );
};

export default RequestsManagement;