import React, { useState } from 'react';
import { MapPin, Calendar, Users, Key, Home, Mail, Phone, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChfIcon from './ChfIcon';
import { requests } from '../data/requests';

interface RequestsGridProps {
  filters?: {
    location?: string;
    budget?: number;
    requestType?: string;
    moveInDate?: string;
  };
  theme?: 'red' | 'blue';
}

const RequestsGrid: React.FC<RequestsGridProps> = ({ filters, theme = 'blue' }) => {
  const [sortBy, setSortBy] = useState('newest');

  const filterRequests = () => {
    let filteredRequests = [...requests];

    if (filters) {
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        filteredRequests = filteredRequests.filter(r => 
          r.location.city.toLowerCase().includes(searchTerm) ||
          r.location.canton.toLowerCase().includes(searchTerm) ||
          r.location.npa.includes(searchTerm)
        );
      }

      if (filters.budget) {
        filteredRequests = filteredRequests.filter(r => 
          parseInt(r.budget) <= filters.budget!
        );
      }

      if (filters.requestType && filters.requestType !== 'all') {
        filteredRequests = filteredRequests.filter(r => 
          r.type === filters.requestType
        );
      }

      if (filters.moveInDate) {
        filteredRequests = filteredRequests.filter(r => 
          new Date(r.moveInDate) >= new Date(filters.moveInDate!)
        );
      }
    }

    // Tri
    switch (sortBy) {
      case 'budget-asc':
        return filteredRequests.sort((a, b) => parseInt(a.budget) - parseInt(b.budget));
      case 'budget-desc':
        return filteredRequests.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));
      case 'newest':
        return filteredRequests.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return filteredRequests;
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'colocation':
        return <Users className="h-5 w-5" />;
      case 'reprise':
        return <Key className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  const handleShare = async (request: any) => {
    try {
      await navigator.share({
        title: request.title,
        text: `${request.description}\nLocalisation: ${request.location.city}, ${request.location.canton}\nBudget: ${request.budget} CHF/mois`,
        url: window.location.href
      });
    } catch (error) {
      // Fallback pour copier le lien
      await navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const displayedRequests = filterRequests();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm sticky top-0 z-10">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
            {displayedRequests.length} Demande{displayedRequests.length > 1 ? 's' : ''} de recherche
          </h2>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-gray-100 rounded-lg appearance-none cursor-pointer hover:bg-gray-200 transition-colors pr-8"
          >
            <option value="newest">Plus récent</option>
            <option value="budget-asc">Budget croissant</option>
            <option value="budget-desc">Budget décroissant</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {displayedRequests.map((request) => (
          <div 
            key={request.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{request.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{request.location.city}, {request.location.canton}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <ChfIcon className="h-5 w-5 mr-1" />
                    <span>{request.budget} /mois</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{request.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Dès le {new Date(request.moveInDate).toLocaleDateString('fr-CH')}</span>
                  </div>
                  <div className="flex items-center">
                    {getRequestTypeIcon(request.type)}
                    <span className="ml-1">
                      {request.type === 'colocation' ? 'Colocation' : 
                       request.type === 'reprise' ? 'Reprise de bail' : 'Location'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2">
                <a
                  href={`tel:${request.contact.phone}`}
                  className={`flex-1 sm:w-auto px-4 py-2 ${
                    theme === 'blue' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  } rounded-lg transition-colors flex items-center justify-center`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </a>
                <a
                  href={`mailto:${request.contact.email}`}
                  className={`flex-1 sm:w-auto px-4 py-2 border ${
                    theme === 'blue'
                      ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                      : 'border-red-600 text-red-600 hover:bg-red-50'
                  } rounded-lg transition-colors flex items-center justify-center`}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
                <button
                  onClick={() => handleShare(request)}
                  className="flex-1 sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        ))}

        {displayedRequests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">
              Aucune demande ne correspond à vos critères
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsGrid;