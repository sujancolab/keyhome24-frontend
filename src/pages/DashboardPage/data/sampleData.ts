export const sampleListings = [
  {
    id: '1',
    title: 'Appartement neuf 4.5 pièces',
    location: 'Lausanne, Vaud',
    price: '950,000 CHF',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    status: 'active',
    views: 245,
    expiresAt: '2025-12-30',
    description: 'Magnifique appartement traversant de 4.5 pièces avec balcon et vue sur le lac. Cuisine moderne entièrement équipée, 2 salles de bain, parquet dans toutes les pièces.'
  },
  {
    id: '2',
    title: 'Villa contemporaine 6.5 pièces',
    location: 'Lutry, Vaud',
    price: '2,450,000 CHF',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227',
    status: 'active',
    views: 189,
    expiresAt: '2025-12-30',
    description: 'Superbe villa contemporaine avec piscine chauffée, jardin paysager de 1000m², vue panoramique sur le lac. Domotique complète, panneaux solaires.'
  },
  {
    id: '3',
    title: 'Studio meublé centre-ville',
    location: 'Genève, Genève',
    price: '1,800 CHF/mois',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    status: 'active',
    views: 156,
    expiresAt: '2025-12-30',
    description: 'Studio entièrement rénové et meublé au cœur de Genève. Cuisine équipée, salle de bain moderne, proche de toutes commodités.'
  },
  {
    id: '4',
    title: 'Surface commerciale premium',
    location: 'Montreux, Vaud',
    price: '3,500 CHF/mois',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    status: 'active',
    views: 98,
    expiresAt: '2024-03-15',
    description: 'Local commercial de 150m² idéalement situé sur l\'avenue du Casino. Grande vitrine, climatisation, accès livraison.'
  },
  {
    id: '5',
    title: 'Chalet de luxe avec spa',
    location: 'Verbier, Valais',
    price: '1,950,000 CHF',
    image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4',
    status: 'active',
    views: 278,
    expiresAt: '2024-03-10',
    description: 'Magnifique chalet de 5.5 pièces avec spa privé, sauna et jacuzzi. Vue imprenable sur les Alpes, garage double, finitions haut de gamme.'
  }
];

export const sampleRequests = [
  {
    id: 'req-1',
    type: 'location',
    title: 'Recherche 4.5 pièces pour famille',
    location: {
      city: 'Lausanne',
      canton: 'VD'
    },
    budget: '2500 CHF/mois',
    status: 'active',
    expiresAt: '2025-12-30',
    moveInDate: '2024-06-01',
    description: 'Famille de 4 personnes cherche appartement spacieux proche des écoles et des transports publics.',
    rooms: '4.5',
    contact: {
      name: 'Sarah Muller',
      email: 'sarah.muller@example.com',
      phone: '+41 76 123 45 67'
    }
  },
  {
    id: 'req-2',
    type: 'colocation',
    title: 'Chambre en colocation',
    location: {
      city: 'Genève',
      canton: 'GE'
    },
    budget: '800 CHF/mois',
    status: 'active',
    expiresAt: '2025-12-30',
    moveInDate: '2024-06-01',
    description: 'Étudiant en master cherche une chambre en colocation dans un appartement partagé.',
    rooms: '1',
    contact: {
      name: 'Sarah Muller',
      email: 'sarah.muller@example.com',
      phone: '+41 76 123 45 67'
    }
  },
  {
    id: 'req-3',
    type: 'reprise',
    title: 'Reprise de bail studio centre-ville',
    location: {
      city: 'Zürich',
      canton: 'ZH'
    },
    budget: '1500 CHF/mois',
    status: 'active',
    expiresAt: '2025-12-30',
    moveInDate: '2024-05-01',
    description: 'Recherche reprise de bail pour un studio au centre-ville de Zürich, idéalement proche de la gare.',
    rooms: '1.5',
    contact: {
      name: 'Sarah Muller',
      email: 'sarah.muller@example.com',
      phone: '+41 76 123 45 67'
    }
  },
  {
    id: 'req-4',
    type: 'location',
    title: 'Recherche villa avec jardin',
    location: {
      city: 'Nyon',
      canton: 'VD'
    },
    budget: '3500 CHF/mois',
    status: 'active',
    expiresAt: '2024-03-15',
    moveInDate: '2024-07-01',
    description: 'Couple avec deux enfants cherche une villa avec jardin dans un quartier calme.',
    rooms: '5.5',
    contact: {
      name: 'Sarah Muller',
      email: 'sarah.muller@example.com',
      phone: '+41 76 123 45 67'
    }
  },
  {
    id: 'req-5',
    type: 'colocation',
    title: 'Colocation étudiante',
    location: {
      city: 'Fribourg',
      canton: 'FR'
    },
    budget: '700 CHF/mois',
    status: 'active',
    expiresAt: '2024-03-10',
    moveInDate: '2024-09-01',
    description: 'Étudiante en première année cherche une chambre en colocation proche de l\'université.',
    rooms: '1',
    contact: {
      name: 'Sarah Muller',
      email: 'sarah.muller@example.com',
      phone: '+41 76 123 45 67'
    }
  }
];