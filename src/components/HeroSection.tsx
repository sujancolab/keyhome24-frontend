import React, { useState } from 'react';
import { Search, MapPin, Euro, Home, ArrowDown } from 'lucide-react';

export const HeroSection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchType, setSearchType] = useState('buy');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const propertyTypes = [
    'Appartement',
    'Maison',
    'Villa',
    'Loft',
    'Terrain',
    'Local commercial',
    'Bureau'
  ];

  const priceRanges = [
    '0 - 200,000 €',
    '200,000 - 500,000 €',
    '500,000 - 1,000,000 €',
    '1,000,000 - 2,000,000 €',
    '2,000,000 € +'
  ];

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Trouvez Votre Bien Immobilier Idéal
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
          {/* Type de recherche */}
          <div className="flex gap-4 mb-4 border-b pb-4">
            <button
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                searchType === 'buy'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSearchType('buy')}
            >
              Acheter
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                searchType === 'rent'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSearchType('rent')}
            >
              Louer
            </button>
          </div>

          {/* Barre de recherche principale */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ville ou code postal"
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="w-full md:w-48 pl-10 pr-8 py-3 rounded-lg border appearance-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Type de bien</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Home className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <ArrowDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="w-full md:w-48 pl-10 pr-8 py-3 rounded-lg border appearance-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">Budget</option>
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              <Euro className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <ArrowDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button 
              className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Search className="h-5 w-5 mr-2" />
              Rechercher
            </button>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surface minimum
                </label>
                <input
                  type="number"
                  placeholder="m²"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chambres
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                  <option value="">Indifférent</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  État du bien
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                  <option value="">Tous</option>
                  <option value="new">Neuf</option>
                  <option value="excellent">Excellent état</option>
                  <option value="good">Bon état</option>
                  <option value="renovate">À rénover</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étage
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                  <option value="">Indifférent</option>
                  <option value="ground">Rez-de-chaussée</option>
                  <option value="1">1er étage</option>
                  <option value="2+">2ème étage et +</option>
                  <option value="last">Dernier étage</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Extérieur
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                  <option value="">Indifférent</option>
                  <option value="balcony">Balcon</option>
                  <option value="terrace">Terrasse</option>
                  <option value="garden">Jardin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parking
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500">
                  <option value="">Indifférent</option>
                  <option value="1">1+ place</option>
                  <option value="2">2+ places</option>
                  <option value="garage">Garage</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};