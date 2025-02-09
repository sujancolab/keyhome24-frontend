import React, { useState } from 'react';
import { 
  Mail, Phone, User, Calendar, MessageSquare, ExternalLink, 
  ChevronLeft, ChevronRight, Heart, Home, Maximize, Bath,
  ParkingSquare, TreePine, Sun, Wifi, Shield, Zap,
  Thermometer, Train, School, Coffee, Building, Key,
  BedDouble, Warehouse, Ruler
} from 'lucide-react';
import ContactForm from './ContactForm';

interface PropertyDetailProps {
  property: {
    id: number;
    title: string;
    description: string;
    price: number;
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
      parking: number;
      yearBuilt: number;
      floor: number;
      totalFloors: number;
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
    proximity: {
      transport: string[];
      education: string[];
      shopping: string[];
      leisure: string[];
    };
    documents: {
      title: string;
      url: string;
    }[];
  };
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return `CHF ${price.toLocaleString('fr-CH')}`;
  };

  return (
    <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto px-4 py-8">
      {/* Main Content */}
      <div className="col-span-12 lg:col-span-8">
        {/* Image Gallery */}
        <div className="relative h-[500px] mb-8 rounded-lg overflow-hidden group">
          <img
            src={property.images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full"
          >
            <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-600 text-red-600' : 'text-gray-600'}`} />
          </button>
          <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b mb-6">
          {['description', 'caractéristiques', 'localisation', 'documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {activeTab === 'description' && (
            <>
              <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
              <p className="text-gray-600 mb-6">
                {property.location.address}, {property.location.npa} {property.location.city}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <BedDouble className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <p className="font-semibold">{property.features.rooms}</p>
                  <p className="text-sm text-gray-600">Pièces</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Maximize className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <p className="font-semibold">{property.features.area} m²</p>
                  <p className="text-sm text-gray-600">Surface</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <p className="font-semibold">{property.features.bathrooms}</p>
                  <p className="text-sm text-gray-600">Salle de bains</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Building className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <p className="font-semibold">{property.features.floor}/{property.features.totalFloors}</p>
                  <p className="text-sm text-gray-600">Étage</p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">{property.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Disponibilité</h3>
                  <p className="text-gray-700">{property.features.availability}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Orientation</h3>
                  <p className="text-gray-700">{property.features.orientation}</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'caractéristiques' && (
            <div className="space-y-8">
              {/* Caractéristiques intérieures */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Intérieur</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.interior.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Home className="h-5 w-5 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caractéristiques extérieures */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Extérieur</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.exterior.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <TreePine className="h-5 w-5 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sécurité */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sécurité</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.security.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Énergie et durabilité */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Énergie et durabilité</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.energy.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'localisation' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Transports</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.proximity.transport.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Train className="h-5 w-5 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Éducation</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.proximity.education.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <School className="h-5 w-5 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Commerces</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.proximity.shopping.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Coffee className="h-5 w-5 text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Documents disponibles</h3>
              {property.documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                >
                  <ExternalLink className="h-5 w-5 text-red-600 mr-3" />
                  <span>{doc.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        {/* Prix et boutons d'action */}
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Prix</p>
            <p className="text-3xl font-bold text-gray-900">{formatPrice(property.price)}</p>
          </div>
          <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center mb-3">
            <Phone className="h-5 w-5 mr-2" />
            +41 XX XXX XX XX
          </button>
          <button className="w-full border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center">
            <Mail className="h-5 w-5 mr-2" />
            Contacter par email
          </button>
        </div>

        {/* Formulaire de contact */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Contacter l'agent</h3>
          <ContactForm />
        </div>

        {/* Agent Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
              alt="Agent"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">Jean Dupont</h3>
              <p className="text-sm text-gray-600">Agent Immobilier</p>
              <p className="text-sm text-gray-600">ImmoFrance</p>
            </div>
          </div>
          <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
            <ExternalLink className="h-5 w-5 mr-2" />
            Voir le profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;