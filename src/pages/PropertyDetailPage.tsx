import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import PropertyDetail from '../components/PropertyDetail/PropertyDetail';
import { properties } from '../data/properties';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find(p => p.id === id);

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
    proximity: {
      transport: [
        "Bus à 2 minutes",
        "Gare à 10 minutes",
        "Autoroute à 5 minutes"
      ],
      education: [
        "École primaire à 5 minutes",
        "Collège à 10 minutes",
        "Université à 15 minutes"
      ],
      shopping: [
        "Supermarché à 3 minutes",
        "Centre commercial à 10 minutes",
        "Pharmacie à 2 minutes"
      ],
      leisure: [
        "Parc public à 5 minutes",
        "Salle de sport à 8 minutes",
        "Restaurant à 2 minutes"
      ]
    },
    agent: {
      name: "Jean Dupont",
      title: "Agent Immobilier Senior",
      company: "ImmoFrance",
      phone: "+41 21 123 45 67",
      email: "jean.dupont@immofrance.ch",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a"
    },
    documents: [
      {
        name: "Plan de l'appartement",
        type: "PDF",
        url: "#"
      },
      {
        name: "Certificat énergétique",
        type: "PDF",
        url: "#"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PropertyDetail property={propertyData} />
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;