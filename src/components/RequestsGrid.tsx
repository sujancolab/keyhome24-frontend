import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { requests as sampleRequests } from '../data/requests';

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

  const filteredRequests = useMemo(() => {
    let filteredRequests = [...sampleRequests];

    if (filters) {
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        filteredRequests = filteredRequests.filter(r => 
          r.location.city.toLowerCase().includes(searchTerm) ||
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

    return filteredRequests.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return parseInt(a.budget) - parseInt(b.budget);
        case 'price-desc':
          return parseInt(b.budget) - parseInt(a.budget);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [filters, sortBy]);

  const handleShare = async (request: any) => {
    try {
      await navigator.share({
        title: request.title,
        text: `${request.description}\nLocalisation: ${request.location.city}\nBudget: ${request.budget} CHF/mois`,
        url: window.location.href
      });
    } catch (error) {
      await navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'location':
        return 'Location';
      case 'colocation':
        return 'Colocation';
      case 'reprise':
        return 'Reprise de bail';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm sticky top-16 z-10">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
            {filteredRequests.length} Demande{filteredRequests.length > 1 ? 's' : ''} de recherche
          </h2>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-gray-100 rounded-lg appearance-none cursor-pointer hover:bg-gray-200 transition-colors pr-8"
          >
            <option value="newest">Plus récent</option>
            <option value="price-asc">Budget croissant</option>
            <option value="price-desc">Budget décroissant</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{request.title}</h3>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      request.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status === 'active' ? 'Active' : 'En attente'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-4">
                    <span>{request.location.city}</span>
                    <span>{request.budget} CHF/mois</span>
                    <span>{getTypeLabel(request.type)}</span>
                    <span>Dès le {new Date(request.moveInDate).toLocaleDateString('fr-CH')}</span>
                  </div>

                  <p className="text-gray-700">{request.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <a
                  href={`tel:${request.contact.phone}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    theme === 'blue' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Appeler
                </a>
                <a
                  href={`mailto:${request.contact.email}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    theme === 'blue'
                      ? 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                      : 'border border-red-600 text-red-600 hover:bg-red-50'
                  }`}
                >
                  Email
                </a>
                <button
                  onClick={() => handleShare(request)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Partager
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">
            Aucune demande ne correspond à vos critères
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestsGrid;