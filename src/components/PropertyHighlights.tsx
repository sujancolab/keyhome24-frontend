import React from 'react';
import { ArrowRight, MapPin, BedDouble, Bath } from 'lucide-react';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';

const PropertyHighlights = () => {
  // Sélectionner les 3 propriétés les plus récentes
  const highlightedProperties = properties.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Biens en vedette
          </h2>
          <Link 
            to="/properties" 
            className="text-red-600 hover:text-red-700 flex items-center font-medium"
          >
            Voir plus
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightedProperties.map((property) => (
            <Link 
              key={property.id}
              to={`/property/${property.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow block relative"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 text-sm font-medium rounded-lg shadow-lg">
                  <p className="leading-tight">
                    {property.price.toLocaleString('fr-CH')} CHF
                    {property.transactionType === 'rent' && '/mois'}
                  </p>
                  <p className="text-xs text-white/90">Prix brut</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {property.location.npa} {property.location.city}, {property.location.address}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-4 text-gray-900 line-clamp-2">
                  {property.title}
                </h3>

                <div className="flex gap-6 text-gray-600 text-base">
                  {property.rooms > 0 && (
                    <div className="flex items-center">
                      <BedDouble className="h-5 w-5 mr-2" />
                      <span>{property.rooms}</span>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2" />
                      <span>{property.baths}</span>
                    </div>
                  )}
                  {property.area > 0 && (
                    <div className="flex items-center">
                      <span>{property.area}m²</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyHighlights;