import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, BedDouble, Bath } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(`/property/${property.id}`);
    }, 100);
  };

  return (
    <a 
      href={`/property/${property.id}`}
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow block relative"
    >
      <div className="relative aspect-[4/3]">
        <div className={`absolute inset-0 bg-gray-200 transition-opacity duration-300 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`} />
        
        <img
          src={property.imageUrl}
          alt={property.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 text-sm font-medium rounded-lg shadow-lg">
          <p className="leading-tight">
            {property.price.toLocaleString('fr-CH')} CHF
            {property.transactionType === 'rent' && '/mois'}
          </p>
          <p className="text-xs text-white/90">Prix brut</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center text-gray-600 mb-3 text-base">
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
    </a>
  );
};

export default React.memo(PropertyCard);