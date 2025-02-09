import React from 'react';
import { MapPin, Home, Maximize, Bath, Building2, Mail } from 'lucide-react';
import ImageGallery from './ImageGallery';

interface PropertyDetailProps {
  property: {
    id: number;
    title: string;
    description: string;
    price: string;
    images: string[];
    location: {
      address: string;
      city: string;
      npa: string;
    };
    features: {
      rooms: number;
      bathrooms: number;
      area: number;
      floor: number;
      totalFloors: number;
      yearBuilt: number;
      orientation: string;
      heatingType: string;
      energyClass: string;
      availability: string;
    };
    amenities: {
      interior: string[];
      exterior: string[];
      security: string[];
      energy: string[];
    };
    documents: {
      title: string;
      url: string;
    }[];
  };
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="space-y-6 sm:space-y-8">
        {/* Galerie d'images */}
        <div className="-mx-4 sm:mx-0">
          <ImageGallery images={property.images} />
        </div>

        {/* Caractéristiques principales */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          {property.features.rooms > 0 && (
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <Home className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <span className="block font-semibold">{property.features.rooms}</span>
              <span className="block text-sm text-gray-600">Pièces</span>
            </div>
          )}
          {property.features.area > 0 && (
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <Maximize className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <span className="block font-semibold">{property.features.area} m²</span>
              <span className="block text-sm text-gray-600">Surface</span>
            </div>
          )}
          {property.features.bathrooms > 0 && (
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <Bath className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <span className="block font-semibold">{property.features.bathrooms}</span>
              <span className="block text-sm text-gray-600">Salle(s) de bain</span>
            </div>
          )}
          {property.features.floor !== undefined && (
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <Building2 className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <span className="block font-semibold">{property.features.floor}</span>
              <span className="block text-sm text-gray-600">Étage</span>
            </div>
          )}
        </div>

        {/* Description */}
        {property.description && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>
        )}

        {/* Caractéristiques */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">Caractéristiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Intérieur */}
            {property.amenities.interior.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-4">Intérieur</h3>
                <ul className="space-y-2 text-sm sm:text-base">
                  {property.amenities.interior.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extérieur */}
            {property.amenities.exterior.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-4">Extérieur</h3>
                <ul className="space-y-2 text-sm sm:text-base">
                  {property.amenities.exterior.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Documents */}
        {property.documents.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Documents disponibles</h2>
            <div className="grid gap-3 sm:gap-4">
              {property.documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <span>{doc.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Informations de l'agence */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Agence immobilière</h2>
          <div className="space-y-4">
            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              <p className="font-medium">KeyHome24 SA</p>
              <p>Avenue de la Gare 1</p>
              <p>1003 Lausanne</p>
            </div>
            <a
              href="mailto:contact@keyhome24.ch"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm sm:text-base"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contacter par email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;