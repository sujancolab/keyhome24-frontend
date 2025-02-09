import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { cantons } from '../data/cantons';

interface LocationFieldProps {
  value: string;
  onChange: (value: string) => void;
  theme?: 'red' | 'blue';
  placeholder?: string;
}

const LocationField: React.FC<LocationFieldProps> = ({
  value,
  onChange,
  theme = 'red',
  placeholder = 'Canton, ville ou code postal'
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);

  const colors = {
    red: 'focus:ring-red-500',
    blue: 'focus:ring-blue-500'
  };

  // Filtrer les suggestions
  const getSuggestions = () => {
    const term = searchTerm.toLowerCase();
    return cantons
      .filter(canton => 
        canton.name.toLowerCase().includes(term) ||
        canton.code.toLowerCase().includes(term)
      )
      .map(canton => ({
        type: 'canton',
        value: canton.code,
        label: canton.name
      }));
  };

  const handleSelect = (suggestion: { value: string, label: string }) => {
    setSearchTerm(suggestion.label);
    onChange(suggestion.value);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 ${colors[theme]} focus:ring-2 focus:border-transparent`}
          placeholder={placeholder}
        />
        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              onChange('');
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Liste des suggestions */}
      {showSuggestions && searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {getSuggestions().map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              onClick={() => handleSelect(suggestion)}
            >
              <Search className="h-4 w-4 text-gray-400" />
              <span>{suggestion.label}</span>
            </button>
          ))}
          {getSuggestions().length === 0 && (
            <div className="px-4 py-2 text-gray-500">
              Aucun résultat trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationField;