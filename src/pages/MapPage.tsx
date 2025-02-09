import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import PropertyCard from '../components/PropertyCard';

const properties = [
  {
    id: '1',
    title: 'Appartement moderne',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    price: 750000,
    rooms: 4.5,
    baths: 2,
    area: 120,
    location: {
      npa: '8001',
      city: 'Zürich',
      address: 'Bahnhofstrasse 1',
      coordinates: [47.3769, 8.5417]
    },
    features: {
      parking: true,
      garden: false
    },
    type: 'apartment'
  },
  // Add more properties as needed
];

const MapPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="h-[calc(100vh-2rem)] rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={[47.3769, 8.5417]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {properties.map((property) => (
              <Marker
                key={property.id}
                position={property.location.coordinates}
                icon={customIcon}
                eventHandlers={{
                  click: () => setSelectedProperty(property.id)
                }}
              >
                <Popup>
                  <PropertyCard property={property} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-2rem)]">
          <div className="grid gap-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;