import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, Calendar, ChevronRight, ArrowDown } from 'lucide-react';
import ChfIcon from './ChfIcon';
import { cantons } from '../data/cantons';

interface RequestSearchBarProps {
  onFilterChange: (filters: {
    location: string;
    budget?: number;
    requestType: string;
    moveInDate?: string;
  }) => void;
  currentFilters: {
    location: string;
    budget?: number;
    requestType: string;
    moveInDate?: string;
  };
  theme?: 'red' | 'blue';
  placeholder?: string;
}

const RequestSearchBar: React.FC<RequestSearchBarProps> = ({ 
  onFilterChange,
  currentFilters,
  theme = 'blue',
  placeholder = 'Canton, ville ou code postal'
}) => {
  const [location, setLocation] = useState(currentFilters.location);
  const [budget, setBudget] = useState(currentFilters.budget?.toString() || '');
  const [requestType, setRequestType] = useState(currentFilters.requestType || 'colocation');
  const [moveInDate, setMoveInDate] = useState(currentFilters.moveInDate || '');
  const [showFilters, setShowFilters] = useState(false);

  const colors = {
    red: {
      primary: 'bg-red-600 text-white hover:bg-red-700',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      focus: 'focus:ring-red-500'
    },
    blue: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      focus: 'focus:ring-blue-500'
    }
  }[theme];

  useEffect(() => {
    const filters = {
      location,
      budget: budget ? parseInt(budget) : undefined,
      requestType,
      moveInDate: moveInDate || undefined
    };
    onFilterChange(filters);
  }, [location, budget, requestType, moveInDate, onFilterChange]);

  const generateBudgetRanges = () => {
    const ranges = [];
    let currentBudget = 500;
    
    while (currentBudget <= 10000) {
      ranges.push({
        label: `Jusqu'à ${currentBudget.toLocaleString('fr-CH')} CHF/mois`,
        value: currentBudget
      });
      currentBudget += currentBudget < 2000 ? 500 : 1000;
    }
    
    ranges.push({
      label: "Plus de 10'000 CHF/mois",
      value: 10001
    });

    return ranges;
  };

  const requestTypes = [
    {
      type: 'colocation',
      label: 'Colocation',
      mobileLabel: 'Coloc',
      icon: Users
    },
    {
      type: 'location',
      label: 'Location',
      mobileLabel: 'Loc',
      icon: Search
    },
    {
      type: 'reprise',
      label: 'Reprise',
      mobileLabel: 'Reprise',
      icon: ChevronRight
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-4">
        {/* Type de demande - Version mobile et desktop */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {requestTypes.map(({ type, label, mobileLabel, icon: Icon }) => (
            <button
              key={type}
              className={`py-2 sm:py-3 px-2 sm:px-6 rounded-lg font-medium transition-all flex flex-col sm:flex-row items-center justify-center ${
                requestType === type
                  ? colors.primary
                  : colors.secondary
              }`}
              onClick={() => setRequestType(type)}
            >
              <Icon className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" />
              <span className="text-xs sm:text-base">
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{mobileLabel}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Bouton pour afficher/masquer les filtres sur mobile */}
        <button
          className="w-full sm:hidden mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-between"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filtres</span>
          <ArrowDown className={`h-5 w-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Filtres - Masqués par défaut sur mobile */}
        <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-4 relative">
              <input
                type="text"
                placeholder={placeholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 ${colors.focus}`}
              />
              <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="lg:col-span-4 relative">
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={`w-full pl-10 pr-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 ${colors.focus} appearance-none`}
              >
                <option value="">Budget max.</option>
                {generateBudgetRanges().map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              <ChfIcon className="absolute left-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
              <ArrowDown className="absolute right-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="lg:col-span-4 relative">
              <input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 ${colors.focus}`}
                min={new Date().toISOString().split('T')[0]}
                placeholder="Date d'emménagement"
              />
              <Calendar className="absolute left-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSearchBar;