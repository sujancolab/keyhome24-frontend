import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface TableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  showFilters: boolean;
  onClearFilters: () => void;
  placeholder?: string;
  children?: React.ReactNode;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  showFilters,
  onClearFilters,
  placeholder = "Rechercher...",
  children
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button 
          onClick={onFilterClick}
          className={`px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center ${
            showFilters ? 'bg-red-50 border-red-200 text-red-600' : ''
          }`}
        >
          <Filter className="h-5 w-5 mr-2" />
          Filtres
          {showFilters && (
            <X 
              className="h-4 w-4 ml-2 hover:text-red-700" 
              onClick={(e) => {
                e.stopPropagation();
                onClearFilters();
              }}
            />
          )}
        </button>
      </div>

      {showFilters && children && (
        <div className="bg-white border rounded-lg p-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default TableFilters;