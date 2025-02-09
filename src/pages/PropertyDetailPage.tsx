import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import PropertyDetail from '../components/PropertyDetail/PropertyDetail';
import { properties } from '../data/properties';
import { ArrowLeft, Phone, Navigation, Share2 } from 'lucide-react';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const property = properties.find(p => p.id === id);

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/properties' + location.search);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: property?.title,
        text: `Découvrez ce bien immobilier : ${property?.title} à ${property?.location.city}`,
        url: window.location.href
      });
    } catch (error) {
      await navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleDirection = () => {
    if (property) {
      const address = `${property.location.address}, ${property.location.npa} ${property.location.city}`;
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Propriété non trouvée
          </h1>
          <p className="text-gray-600">
            La propriété que vous recherchez n'existe pas ou a été supprimée.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const priceString = typeof property.price === 'number' 
    ? `${property.price.toLocaleString('fr-CH')} CHF` 
    : property.price;

  const isRental = property.transactionType === 'rent';

  const propertyData = {
    id: property.id,
    title: property.title,
    description: `Magnifique ${property.type.toLowerCase()} situé(e) à ${property.location.city}. 
    Ce bien offre ${property.rooms} pièces réparties sur ${property.area} m², avec ${property.baths} salle(s) de bain.
    ${property.features.parking ? 'Une place de parking est incluse. ' : ''}
    ${property.features.garden ? 'Profitez également d\'un jardin privatif. ' : ''}`,
    price: property.price,
    images: [property.imageUrl],
    location: property.location,
    features: {
      rooms: property.rooms,
      bathrooms: property.baths,
      area: property.area,
      floor: 2,
      totalFloors: 5,
      yearBuilt: 2020,
      orientation: "Sud-Ouest",
      heatingType: "Pompe à chaleur",
      energyClass: "A",
      availability: "Immédiatement"
    },
    amenities: {
      interior: [
        "Cuisine équipée",
        "Parquet",
        "Double vitrage",
        "Dressing",
        property.features.parking ? "Place de parking" : null,
      ].filter(Boolean),
      exterior: [
        property.features.garden ? "Jardin privatif" : "Balcon",
        "Local à vélos"
      ],
      security: [
        "Vidéophone",
        "Porte blindée",
        "Alarme"
      ],
      energy: [
        "Pompe à chaleur",
        "Double vitrage",
        "Panneaux solaires"
      ]
    },
    documents: [
      {
        title: "Plan de l'appartement",
        url: "#"
      },
      {
        title: "Certificat énergétique",
        url: "#"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* En-tête fixe - Adapté pour mobile */}
      <div className="sticky top-16 bg-white border-b shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Bouton retour */}
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm sm:text-base">Retour aux résultats</span>
          </button>
          
          {/* Contenu de l'en-tête */}
          <div className="space-y-4">
            {/* Titre et adresse */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">{property.title}</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{property.location.address}, {property.location.npa} {property.location.city}</p>
            </div>

            {/* Prix, boutons de contact et actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Prix */}
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {priceString}
                {isRental && (
                  <span className="block text-sm text-gray-500">CHF brut</span>
                )}
              </div>

              {/* Boutons de contact et actions */}
              <div className="flex w-full sm:w-auto gap-2 flex-wrap">
                <a
                  href="tel:+41XXXXXXXXX"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 sm:py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Phone className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Appeler</span>
                </a>
                <button
                  onClick={handleDirection}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Navigation className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Itinéraire</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Partager</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <PropertyDetail property={propertyData} />
      
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;