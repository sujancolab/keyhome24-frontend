import React from 'react';
import { BedDouble, Bath, Building, Maximize } from 'lucide-react';

interface PropertyFeaturesProps {
  features: {
    rooms: number;
    bathrooms: number;
    area: number;
    floor: number;
    totalFloors: number;
  };
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-colors">
        <BedDouble className="h-8 w-8 mx-auto mb-3 text-red-600" />
        <p className="text-2xl font-bold text-gray-900">{features.rooms}</p>
        <p className="text-sm text-gray-600 mt-1">Pièces</p>
      </div>
      <div className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-colors">
        <Maximize className="h-8 w-8 mx-auto mb-3 text-red-600" />
        <p className="text-2xl font-bold text-gray-900">{features.area} m²</p>
        <p className="text-sm text-gray-600 mt-1">Surface</p>
      </div>
      <div className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-colors">
        <Bath className="h-8 w-8 mx-auto mb-3 text-red-600" />
        <p className="text-2xl font-bold text-gray-900">{features.bathrooms}</p>
        <p className="text-sm text-gray-600 mt-1">Salle de bains</p>
      </div>
      <div className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-colors">
        <Building className="h-8 w-8 mx-auto mb-3 text-red-600" />
        <p className="text-2xl font-bold text-gray-900">{features.floor}/{features.totalFloors}</p>
        <p className="text-sm text-gray-600 mt-1">Étage</p>
      </div>
    </div>
  );
};

export default PropertyFeatures;