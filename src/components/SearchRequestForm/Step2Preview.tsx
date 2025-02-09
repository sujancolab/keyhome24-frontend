import React from 'react';
import { SearchRequestData } from '../../types/searchRequest';
import { MapPin, Calendar, ArrowLeft, Check, Users, Key, Home } from 'lucide-react';
import ChfIcon from '../ChfIcon';

interface Step2PreviewProps {
  data: SearchRequestData;
  onBack: () => void;
  onConfirm: () => void;
}

export const Step2Preview: React.FC<Step2PreviewProps> = ({ data, onBack, onConfirm }) => {
  const TypeIcon = {
    location: Home,
    colocation: Users,
    reprise: Key
  }[data.type];

  const typeLabels = {
    location: 'Location',
    colocation: 'Colocation',
    reprise: 'Reprise de bail'
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h2 className="text-xl font-semibold mb-6">Aperçu de votre demande</h2>
        
        {/* En-tête */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <TypeIcon className="h-8 w-8 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{data.title}</h3>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                {typeLabels[data.type]}
              </span>
            </div>
            <div className="flex flex-wrap items-center text-gray-600 gap-4">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {data.location.city}, {data.location.npa} ({data.location.canton})
              </span>
              <span className="flex items-center">
                <ChfIcon className="h-4 w-4 mr-1" />
                {data.budget} CHF
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Dès le {new Date(data.moveInDate).toLocaleDateString('fr-CH')}
              </span>
            </div>
          </div>
        </div>

        {/* Critères principaux */}
        <div className="grid grid-cols-2 gap-6 border-t border-b py-6 mb-6">
          <div>
            <h4 className="font-medium mb-2">Type de bien</h4>
            <p className="text-gray-600">{data.propertyType}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Nombre de pièces</h4>
            <p className="text-gray-600">{data.rooms}</p>
          </div>

          {/* Informations spécifiques selon le type */}
          {data.type === 'colocation' && data.colocation && (
            <>
              <div>
                <h4 className="font-medium mb-2">Colocataires souhaités</h4>
                <p className="text-gray-600">{data.colocation.currentRoommates} personne(s)</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tranche d'âge</h4>
                <p className="text-gray-600">{data.colocation.averageAge}</p>
              </div>
            </>
          )}

          {data.type === 'reprise' && data.reprise && (
            <>
              <div>
                <h4 className="font-medium mb-2">Date de fin de bail</h4>
                <p className="text-gray-600">
                  {data.reprise.endDate ? new Date(data.reprise.endDate).toLocaleDateString('fr-CH') : 'Non spécifié'}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Frais de reprise max.</h4>
                <p className="text-gray-600">
                  {data.reprise.fees ? `${data.reprise.fees} CHF` : 'Non spécifié'}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Description de la recherche</h4>
          <div className="bg-gray-50 p-4 rounded-lg max-w-full">
            <p className="text-gray-700 whitespace-pre-wrap break-words">{data.description}</p>
          </div>
        </div>

        {/* Caractéristiques souhaitées */}
        {Object.values(data.features).some(Boolean) && (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Caractéristiques souhaitées</h4>
            <div className="flex flex-wrap gap-2">
              {data.features.parking && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Place de parking</span>
              )}
              {data.features.garden && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Jardin/Terrasse</span>
              )}
              {data.features.furnished && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Meublé</span>
              )}
              {data.features.petsAllowed && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Animaux acceptés</span>
              )}
            </div>
          </div>
        )}

        {/* Coordonnées */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Vos coordonnées</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <p className="text-gray-600">{data.contact.name}</p>
            <p className="text-gray-600">{data.contact.email}</p>
            <p className="text-gray-600">{data.contact.phone}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Modifier
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-sm flex items-center"
        >
          <Check className="h-5 w-5 mr-2" />
          Continuer
        </button>
      </div>
    </div>
  );
};