import React, { useState } from 'react';
import { Users, Key, Search } from 'lucide-react';

interface SearchHeaderProps {
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  type: string;
  location: string;
  budget: string;
  rooms: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    location: '',
    budget: '',
    rooms: ''
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch?.(newFilters);
  };

  return (
    <div className="bg-red-700 py-4 sm:py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border-0 text-sm sm:text-base focus:ring-2 focus:ring-red-500 appearance-none shadow-md"
            >
              <option value="all">Tous les types</option>
              <option value="colocation">Colocation</option>
              <option value="location">Location</option>
              <option value="reprise">Reprise de bail</option>
            </select>
            <Users className="absolute left-3 top-2.5 sm:top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Canton, ville ou code postal"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border-0 text-sm sm:text-base focus:ring-2 focus:ring-red-500 shadow-md"
            />
            <Key className="absolute left-3 top-2.5 sm:top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={filters.budget}
              onChange={(e) => handleFilterChange('budget', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border-0 text-sm sm:text-base focus:ring-2 focus:ring-red-500 appearance-none shadow-md"
            >
              <option value="">Budget max.</option>
              <option value="1000">Jusqu'à 1000 CHF</option>
              <option value="1500">Jusqu'à 1500 CHF</option>
              <option value="2000">Jusqu'à 2000 CHF</option>
              <option value="2500">Jusqu'à 2500 CHF</option>
              <option value="3000">Jusqu'à 3000 CHF</option>
              <option value="4000">Jusqu'à 4000 CHF</option>
              <option value="5000">Plus de 5000 CHF</option>
            </select>
            <Search className="absolute left-3 top-2.5 sm:top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={filters.rooms}
              onChange={(e) => handleFilterChange('rooms', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border-0 text-sm sm:text-base focus:ring-2 focus:ring-red-500 appearance-none shadow-md"
            >
              <option value="">Pièces</option>
              <option value="1-1.5">1 - 1.5</option>
              <option value="2-2.5">2 - 2.5</option>
              <option value="3-3.5">3 - 3.5</option>
              <option value="4-4.5">4 - 4.5</option>
              <option value="5+">5+</option>
            </select>
            <Search className="absolute left-3 top-2.5 sm:top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;