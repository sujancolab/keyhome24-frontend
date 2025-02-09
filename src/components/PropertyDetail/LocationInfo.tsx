import React from 'react';
import { Train, School, ShoppingBag, Coffee } from 'lucide-react';

interface LocationInfoProps {
  location: {
    address: string;
    city: string;
    npa: string;
  };
  proximity: {
    transport: string[];
    education: string[];
    shopping: string[];
    leisure: string[];
  };
}

const LocationInfo: React.FC<LocationInfoProps> = ({ location, proximity }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Adresse</h3>
        <p className="text-gray-700">
          {location.address}<br />
          {location.npa} {location.city}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proximity.transport?.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Train className="h-5 w-5 text-red-600 mr-2" />
              Transports
            </h3>
            <ul className="space-y-2">
              {proximity.transport.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {proximity.education?.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <School className="h-5 w-5 text-red-600 mr-2" />
              Éducation
            </h3>
            <ul className="space-y-2">
              {proximity.education.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {proximity.shopping?.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <ShoppingBag className="h-5 w-5 text-red-600 mr-2" />
              Commerces
            </h3>
            <ul className="space-y-2">
              {proximity.shopping.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {proximity.leisure?.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Coffee className="h-5 w-5 text-red-600 mr-2" />
              Loisirs
            </h3>
            <ul className="space-y-2">
              {proximity.leisure.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInfo;