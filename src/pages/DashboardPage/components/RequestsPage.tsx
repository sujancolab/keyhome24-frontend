import React from 'react';
import { MapPin, Calendar, Users, Key, Home } from 'lucide-react';
import ChfIcon from '../../../components/ChfIcon';

interface RequestsPageProps {
  requests: any[];
  onDeleteRequest: (id: string) => void;
}

const RequestsPage: React.FC<RequestsPageProps> = ({ requests, onDeleteRequest }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Mes demandes</h2>

      <div className="space-y-4">
        {requests.map((request) => (
          <div 
            key={request.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{request.title}</h3>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    request.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status === 'active' ? 'Active' : 'En attente'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {request.location.city}, {request.location.canton}
                  </div>
                  <div className="flex items-center gap-2">
                    <ChfIcon className="h-4 w-4" />
                    {request.budget} CHF/mois
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Dès le {new Date(request.moveInDate).toLocaleDateString('fr-CH')}
                  </div>
                  <div className="flex items-center gap-2">
                    {request.type === 'colocation' ? (
                      <Users className="h-4 w-4" />
                    ) : request.type === 'reprise' ? (
                      <Key className="h-4 w-4" />
                    ) : (
                      <Home className="h-4 w-4" />
                    )}
                    {request.type === 'colocation' ? 'Colocation' : 
                     request.type === 'reprise' ? 'Reprise de bail' : 'Location'}
                  </div>
                </div>

                <p className="mt-4 text-gray-700 line-clamp-2">{request.description}</p>
              </div>

              <div className="flex sm:flex-col gap-2">
                <button 
                  className="flex-1 sm:w-auto px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => onDeleteRequest(request.id)}
                  className="flex-1 sm:w-auto px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Vous n'avez pas encore de demandes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;