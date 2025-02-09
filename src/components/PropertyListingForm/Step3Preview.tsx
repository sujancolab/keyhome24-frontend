import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin, Home, Maximize, Bath, Building2, Calendar, Mail, ChevronLeft, ChevronRight, Phone, Navigation, Share2 } from 'lucide-react';
import { PropertyFormData, propertyTypeLabels } from '../../types/propertyListing';
import FormActions from '../common/FormActions';

interface Step3PreviewProps {
  onNext: () => void;
  onBack: () => void;
}

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap">
          {content}
        </div>
      )}
    </div>
  );
};

const Step3Preview: React.FC<Step3PreviewProps> = ({ onNext, onBack }) => {
  const { watch } = useFormContext<PropertyFormData>();
  const data = watch();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (data.media?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (data.media?.images?.length || 1) - 1 : prev - 1
    );
  };

  // S'assurer que les valeurs numériques sont définies
  const rooms = data.features?.rooms || 0;
  const area = data.features?.area || 0;
  const bathrooms = data.features?.bathrooms || 0;
  const floor = data.features?.floor || 0;

  return (
    <div className="space-y-6">
      {/* En-tête fixe */}
      <div className="sticky top-0 bg-white border-b shadow-sm z-10">
        <div className="p-4">
          {/* Bouton retour */}
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>Retour</span>
          </button>
          
          {/* Contenu de l'en-tête */}
          <div className="space-y-4">
            {/* Titre et adresse */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
                {propertyTypeLabels[data.propertyType]}, {rooms} pièces, {area} m²
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {data.location.address}, {data.location.postalCode} {data.location.city}
              </p>
            </div>

            {/* Prix et actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Prix */}
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {data.price?.toLocaleString('fr-CH')} CHF
                {data.type === 'rent' && (
                  <span className="block text-sm text-gray-500">CHF brut</span>
                )}
              </div>

              {/* Boutons de contact et actions */}
              <div className="flex w-full sm:w-auto gap-2 flex-wrap">
                <Tooltip content="+41 XX XXX XX XX">
                  <div className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 sm:py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg cursor-not-allowed opacity-80">
                    <Phone className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline">Appeler</span>
                  </div>
                </Tooltip>

                <Tooltip content="Ouvrir dans Google Maps">
                  <div className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg cursor-not-allowed opacity-80">
                    <Navigation className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline">Itinéraire</span>
                  </div>
                </Tooltip>

                <Tooltip content="Partager l'annonce">
                  <div className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg cursor-not-allowed opacity-80">
                    <Share2 className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline">Partager</span>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
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

      {/* Caractéristiques principales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b">
        {rooms > 0 && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Home className="h-6 w-6 mx-auto mb-2 text-red-600" />
            <span className="block font-semibold">{rooms}</span>
            <span className="block text-sm text-gray-600">Pièces</span>
          </div>
        )}
        {area > 0 && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Maximize className="h-6 w-6 mx-auto mb-2 text-red-600" />
            <span className="block font-semibold">{area} m²</span>
            <span className="block text-sm text-gray-600">Surface</span>
          </div>
        )}
        {bathrooms > 0 && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Bath className="h-6 w-6 mx-auto mb-2 text-red-600" />
            <span className="block font-semibold">{bathrooms}</span>
            <span className="block text-sm text-gray-600">Salle(s) de bain</span>
          </div>
        )}
        {floor !== undefined && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Building2 className="h-6 w-6 mx-auto mb-2 text-red-600" />
            <span className="block font-semibold">{floor}</span>
            <span className="block text-sm text-gray-600">Étage</span>
          </div>
        )}
      </div>

      {/* Description */}
      {data.description && (
        <div className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{data.description}</p>
        </div>
      )}

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
          {data.features.custom?.map((feature, index) => (
            feature && (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                <span className="text-gray-700">{feature}</span>
              </div>
            )
          ))}
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

      <FormActions
        onBack={onBack}
        onNext={onNext}
        showNext={true}
      />
    </div>
  );
};

export default Step3Preview;