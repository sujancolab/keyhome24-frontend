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
}

const RequestSearchBar: React.FC<RequestSearchBarProps> = ({ 
  onFilterChange,
  currentFilters,
  theme = 'blue'
}) => {
  const [location, setLocation] = useState(currentFilters.location);
  const [budget, setBudget] = useState(currentFilters.budget?.toString() || '');
  const [requestType, setRequestType] = useState(currentFilters.requestType || 'all');
  const [moveInDate, setMoveInDate] = useState(currentFilters.moveInDate || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

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
  }, [location, budget, requestType, moveInDate]);

  const generateBudgetRanges = () => {
    const ranges = [];
    let currentBudget = 500;
    
    while (currentBudget <= 5000) {
      ranges.push({
        label: `Jusqu'à ${currentBudget.toLocaleString('fr-CH')} CHF/mois`,
        value: currentBudget
      });
      currentBudget += currentBudget < 2000 ? 500 : 1000;
    }

    return ranges;
  };

  const getSuggestions = () => {
    const term = location.toLowerCase();
    return cantons
      .filter(canton => 
        canton.name.toLowerCase().includes(term) ||
        canton.code.toLowerCase().includes(term)
      )
      .slice(0, 5);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-4">
        {/* Type de demande */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            className={`py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
              requestType === 'all'
                ? colors.primary
                : colors.secondary
            }`}
            onClick={() => setRequestType('all')}
          >
            <Search className="h-5 w-5 mr-2" />
            Toutes
          </button>
          <button
            className={`py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
              requestType === 'colocation'
                ? colors.primary
                : colors.secondary
            }`}
            onClick={() => setRequestType('colocation')}
          >
            <Users className="h-5 w-5 mr-2" />
            Colocation
          </button>
          <button
            className={`py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
              requestType === 'reprise'
                ? colors.primary
                : colors.secondary
            }`}
            onClick={() => setRequestType('reprise')}
          >
            <ChevronRight className="h-5 w-5 mr-2" />
            Reprise
          </button>
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-4 relative">
            <input
              type="text"
              placeholder="Canton, ville ou code postal"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className={`w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 ${colors.focus}`}
            />
            <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
            
            {showSuggestions && location && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                {getSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    onClick={() => {
                      setLocation(suggestion.name);
                      setShowSuggestions(false);
                    }}
                  >
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{suggestion.name}</span>
                  </button>
                ))}
              </div>
            )}
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
  );
};

export default RequestSearchBar;