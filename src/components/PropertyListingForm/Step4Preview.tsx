import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin, Calendar, Home, Maximize, Bath, Building2, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyFormData, propertyTypeLabels } from '../../types/propertyListing';
import FormActions from '../common/FormActions';

interface Step4PreviewProps {
  onNext: () => void;
  onBack: () => void;
}

const Step4Preview: React.FC<Step4PreviewProps> = ({ onNext, onBack }) => {
  const { watch } = useFormContext<PropertyFormData>();
  const data = watch();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    if (data.media?.images) {
      setCurrentImageIndex(prev => 
        prev === data.media.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (data.media?.images) {
      setCurrentImageIndex(prev => 
        prev === 0 ? data.media.images.length - 1 : prev - 1
      );
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-CH')} CHF${data.type === 'rent' ? '/mois' : ''}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Galerie d'images */}
        {data.media?.images && data.media.images.length > 0 && (
          <div className="relative h-[500px] mb-6">
            <img
              src={URL.createObjectURL(data.media.images[currentImageIndex])}
              alt="Aperçu principal"
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
            <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {data.media.images.length}
            </div>
          </div>
        )}

        <div className="p-6">
          {/* En-tête avec titre, localisation et prix */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {propertyTypeLabels[data.propertyType]} {data.features.rooms} pièces, {data.features.area} m²
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {data.location.address}, {data.location.postalCode} {data.location.city}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(data.price)}
              </div>
              <div className="text-sm text-gray-500">Prix brut</div>
            </div>
          </div>

          {/* Caractéristiques principales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b">
            {data.features.rooms > 0 && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Home className="h-6 w-6 mx-auto mb-2 text-red-600" />
                <span className="block font-semibold">{data.features.rooms}</span>
                <span className="block text-sm text-gray-600">Pièces</span>
              </div>
            )}
            {data.features.area > 0 && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Maximize className="h-6 w-6 mx-auto mb-2 text-red-600" />
                <span className="block font-semibold">{data.features.area} m²</span>
                <span className="block text-sm text-gray-600">Surface</span>
              </div>
            )}
            {data.features.bathrooms > 0 && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Bath className="h-6 w-6 mx-auto mb-2 text-red-600" />
                <span className="block font-semibold">{data.features.bathrooms}</span>
                <span className="block text-sm text-gray-600">Salle(s) de bain</span>
              </div>
            )}
            {data.features.floor !== undefined && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Building2 className="h-6 w-6 mx-auto mb-2 text-red-600" />
                <span className="block font-semibold">{data.features.floor}</span>
                <span className="block text-sm text-gray-600">Étage</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="py-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{data.description}</p>
          </div>

          {/* Équipements */}
          <div className="py-6">
            <h2 className="text-xl font-semibold mb-4">Équipements</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.features.parking && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Place de parking</span>
                </div>
              )}
              {data.features.balcony && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Balcon/Terrasse</span>
                </div>
              )}
              {data.features.elevator && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  <span className="text-gray-700">Ascenseur</span>
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          {data.media?.documents && data.media.documents.length > 0 && (
            <div className="py-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Documents disponibles</h2>
              <div className="space-y-2">
                {data.media.documents.map((file: File, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disponibilité */}
          {data.availability && (
            <div className="py-6 border-t flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Disponible dès le {new Date(data.availability).toLocaleDateString('fr-CH')}</span>
            </div>
          )}

          {/* Informations de l'agence */}
          <div className="py-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Agence immobilière</h2>
            <div className="space-y-2">
              <p className="text-gray-700">{data.agencyInfo.name}</p>
              <p className="text-gray-700">{data.agencyInfo.address}</p>
              <p className="text-gray-700">{data.agencyInfo.location}</p>
              <p className="text-gray-700">{data.agencyInfo.phone}</p>
              <p className="text-gray-700">{data.agencyInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      <FormActions
        onBack={onBack}
        onNext={onNext}
        showNext={true}
      />
    </div>
  );
};

export default Step4Preview;