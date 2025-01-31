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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <BedDouble className="h-6 w-6 mx-auto mb-2 text-red-600" />
        <p className="font-semibold">{features.rooms}</p>
        <p className="text-sm text-gray-600">Pièces</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <Maximize className="h-6 w-6 mx-auto mb-2 text-red-600" />
        <p className="font-semibold">{features.area} m²</p>
        <p className="text-sm text-gray-600">Surface</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <Bath className="h-6 w-6 mx-auto mb-2 text-red-600" />
        <p className="font-semibold">{features.bathrooms}</p>
        <p className="text-sm text-gray-600">Salle de bains</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <Building className="h-6 w-6 mx-auto mb-2 text-red-600" />
        <p className="font-semibold">{features.floor}/{features.totalFloors}</p>
        <p className="text-sm text-gray-600">Étage</p>
      </div>
    </div>
  );
};

export default PropertyFeatures;