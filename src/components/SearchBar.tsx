import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, ArrowDown } from 'lucide-react';
import ChfIcon from './ChfIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import { propertyCategories, propertyTypes } from '../types/propertyListing';

interface SearchBarProps {
  onSearchTypeChange: (type: 'buy' | 'rent') => void;
  onFilterChange: (filters: any) => void;
  searchType: 'buy' | 'rent';
  currentFilters: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchTypeChange,
  onFilterChange,
  searchType,
  currentFilters
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [location_, setLocation] = useState(currentFilters.location || '');
  const [propertyType, setPropertyType] = useState(currentFilters.propertyType || '');
  const [priceMax, setPriceMax] = useState(currentFilters.priceMax?.toString() || '');
  const [rooms, setRooms] = useState(currentFilters.rooms?.toString() || '');

  useEffect(() => {
    const filters = {
      location: location_,
      propertyType,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
      rooms: rooms ? parseFloat(rooms) : undefined
    };
    onFilterChange(filters);

    const searchParams = new URLSearchParams();
    searchParams.set('type', searchType);
    if (location_) searchParams.set('location', location_);
    if (priceMax) searchParams.set('priceMax', priceMax);
    if (propertyType) searchParams.set('propertyType', propertyType);
    if (rooms) searchParams.set('rooms', rooms);

    localStorage.setItem('propertySearchFilters', JSON.stringify({
      searchType,
      ...filters
    }));

    if (!location.pathname.includes('/properties')) {
      navigate(`/properties?${searchParams.toString()}`);
    } else {
      window.history.replaceState(null, '', `?${searchParams.toString()}`);
    }
  }, [searchType, location_, propertyType, priceMax, rooms]);

  const getPriceOptions = () => {
    if (searchType === 'rent') {
      return [
        { value: "1000", label: "Jusqu'à 1'000 CHF/mois" },
        { value: "2000", label: "Jusqu'à 2'000 CHF/mois" },
        { value: "3000", label: "Jusqu'à 3'000 CHF/mois" },
        { value: "4000", label: "Jusqu'à 4'000 CHF/mois" },
        { value: "5000", label: "Jusqu'à 5'000 CHF/mois" },
        { value: "6000", label: "Jusqu'à 6'000 CHF/mois" },
        { value: "7000", label: "Jusqu'à 7'000 CHF/mois" },
        { value: "8000", label: "Jusqu'à 8'000 CHF/mois" },
        { value: "9000", label: "Jusqu'à 9'000 CHF/mois" },
        { value: "10000", label: "Jusqu'à 10'000 CHF/mois" },
        { value: "10001", label: "Plus de 10'000 CHF/mois" }
      ];
    } else {
      return [
        { value: "500000", label: "Jusqu'à 500'000 CHF" },
        { value: "1000000", label: "Jusqu'à 1'000'000 CHF" },
        { value: "1500000", label: "Jusqu'à 1'500'000 CHF" },
        { value: "2000000", label: "Jusqu'à 2'000'000 CHF" },
        { value: "2500000", label: "Jusqu'à 2'500'000 CHF" },
        { value: "3000000", label: "Jusqu'à 3'000'000 CHF" },
        { value: "4000000", label: "Jusqu'à 4'000'000 CHF" },
        { value: "5000000", label: "Jusqu'à 5'000'000 CHF" },
        { value: "6000000", label: "Jusqu'à 6'000'000 CHF" },
        { value: "7000000", label: "Jusqu'à 7'000'000 CHF" },
        { value: "8000000", label: "Jusqu'à 8'000'000 CHF" },
        { value: "9000000", label: "Jusqu'à 9'000'000 CHF" },
        { value: "10000000", label: "Jusqu'à 10'000'000 CHF" },
        { value: "10000001", label: "Plus de 10'000'000 CHF" }
      ];
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      {/* Type de recherche */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => onSearchTypeChange('buy')}
          className={`py-2 rounded-lg font-medium transition-colors ${
            searchType === 'buy'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Acheter
        </button>
        <button
          onClick={() => onSearchTypeChange('rent')}
          className={`py-2 rounded-lg font-medium transition-colors ${
            searchType === 'rent'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Louer
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative flex flex-col lg:flex-row gap-3">
        {/* Groupe principal (localisation + type) */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Ville ou code postal"
              value={location_}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500"
            />
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-10 pr-8 py-3 rounded-lg border appearance-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Type de bien</option>
              {propertyCategories.map((category) => (
                <optgroup key={category.id} label={category.label}>
                  {category.types.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                      {propertyTypes[type]?.label || type}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <Home className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <ArrowDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Groupe secondaire (prix + pièces) */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <select
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-full pl-10 pr-8 py-3 rounded-lg border appearance-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Budget max.</option>
              {getPriceOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChfIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <ArrowDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="w-full pl-10 pr-8 py-3 rounded-lg border appearance-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Pièces</option>
              <option value="1">1 - 1.5 pièces</option>
              <option value="2">2 - 2.5 pièces</option>
              <option value="3">3 - 3.5 pièces</option>
              <option value="4">4 - 4.5 pièces</option>
              <option value="5">5 - 5.5 pièces</option>
              <option value="6">6+ pièces</option>
            </select>
            <Home className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <ArrowDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;