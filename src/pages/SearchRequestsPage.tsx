import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Share2, Plus, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import SearchHeader from '../components/SearchHeader';
import RequestTypeIcon from '../components/RequestTypeIcon';

interface Location {
  canton: string;
  npa: string;
  city: string;
}

interface Contact {
  phone: string;
  email: string;
}

interface SearchRequest {
  id: number;
  type: 'colocation' | 'location' | 'reprise';
  title: string;
  location: Location;
  budget: string;
  rooms: string;
  description: string;
  date: string;
  contact: Contact;
  image?: string;
}

interface SearchFilters {
  type: string;
  location: string;
  budget: string;
  rooms: string;
}

const initialSearchRequests: SearchRequest[] = [
  {
    id: 1,
    type: 'colocation',
    title: "Colocation à Zürich",
    location: {
      canton: "Zürich",
      npa: "8001",
      city: "Zürich"
    },
    budget: "1200",
    rooms: "1-1.5",
    description: "Étudiant en master cherche une chambre en colocation. Non-fumeur, calme et ordonné.",
    date: "14.03.2024",
    contact: {
      phone: "+41 76 234 56 78",
      email: "coloc@email.ch"
    },
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    id: 2,
    type: 'location',
    title: "Recherche 3.5 pièces à Bern",
    location: {
      canton: "Bern",
      npa: "3011",
      city: "Bern"
    },
    budget: "2000",
    rooms: "3-3.5",
    description: "Couple avec un enfant cherche appartement de 3.5 pièces, idéalement proche des transports publics. Disponibilité dès août 2024.",
    date: "15.03.2024",
    contact: {
      phone: "+41 76 123 45 67",
      email: "recherche@email.ch"
    }
  }
];

const SearchRequestsPage = () => {
  const [filteredRequests, setFilteredRequests] = useState<SearchRequest[]>(initialSearchRequests);

  const handleSearch = useCallback((filters: SearchFilters) => {
    let filtered = [...initialSearchRequests];

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(request => request.type === filters.type);
    }

    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filtered = filtered.filter(request => 
        request.location.canton.toLowerCase().includes(searchTerm) ||
        request.location.city.toLowerCase().includes(searchTerm) ||
        request.location.npa.includes(searchTerm)
      );
    }

    if (filters.budget) {
      const maxBudget = parseInt(filters.budget);
      filtered = filtered.filter(request => parseInt(request.budget) <= maxBudget);
    }

    if (filters.rooms) {
      filtered = filtered.filter(request => request.rooms === filters.rooms);
    }

    setFilteredRequests(filtered);
  }, []);

  const handleShare = async (request: SearchRequest) => {
    try {
      await navigator.share({
        title: request.title,
        text: `${request.description}\nLocalisation: ${request.location.canton}, ${request.location.city}\nBudget: ${request.budget} CHF/mois`,
        url: window.location.href
      });
    } catch (error) {
      console.log('Erreur lors du partage:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                Demandes Immobilières Actives
              </h1>
              <p className="text-red-100">
                Parcourez les demandes existantes ou publiez votre recherche
              </p>
            </div>
            <Link
              to="/auth"
              className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors flex items-center shadow-lg transform hover:scale-105 duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Publier ma demande
            </Link>
          </div>
        </div>
        <SearchHeader onSearch={handleSearch} />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex items-start gap-4 w-full">
                  <RequestTypeIcon type={request.type} className="hidden md:block" />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{request.title}</h3>
                        <p className="text-gray-600">
                          {request.location.city} • {request.budget} CHF/mois
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                        request.type === 'location' ? 'bg-blue-100 text-blue-800' :
                        request.type === 'colocation' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        <RequestTypeIcon type={request.type} size={16} className="p-0 bg-transparent md:hidden" />
                        {request.type === 'location' ? 'Location' :
                         request.type === 'colocation' ? 'Colocation' :
                         'Reprise de bail'}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{request.description}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="text-sm text-gray-600">Publié le {request.date}</span>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`tel:${request.contact.phone}`}
                          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Appeler
                        </a>
                        <a
                          href={`mailto:${request.contact.email}`}
                          className="inline-flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </a>
                        <button
                          onClick={() => handleShare(request)}
                          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Partager
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucune demande ne correspond à vos critères</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchRequestsPage;