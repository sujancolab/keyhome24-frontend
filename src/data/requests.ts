export const requests = [
  {
    id: "1",
    type: "location",
    title: "Demande de location - 3.5 pièces à Lausanne",
    location: {
      canton: "VD",
      npa: "1000",
      city: "Lausanne"
    },
    budget: "2000",
    rooms: "3.5",
    description: "Couple avec un enfant cherche appartement lumineux proche des transports publics. Quartier calme souhaité.",
    moveInDate: "2024-06-01",
    contact: {
      name: "Marie Dubois",
      email: "marie.dubois@email.ch",
      phone: "+41 76 123 45 67"
    },
    status: "active",
    createdAt: "2024-03-15"
  },
  {
    id: "2",
    type: "colocation",
    title: "Demande de colocation - Chambre à Genève",
    location: {
      canton: "GE",
      npa: "1201",
      city: "Genève"
    },
    budget: "1200",
    rooms: "1",
    description: "Étudiant en master cherche une chambre en colocation. Non-fumeur, calme et ordonné.",
    moveInDate: "2024-09-01",
    contact: {
      name: "Lucas Martin",
      email: "lucas.martin@email.ch",
      phone: "+41 77 234 56 78"
    },
    status: "active",
    createdAt: "2024-03-14"
  },
  {
    id: "3",
    type: "reprise",
    title: "Offre de reprise de bail - Studio centre-ville",
    location: {
      canton: "VD",
      npa: "1003",
      city: "Lausanne"
    },
    budget: "1500",
    rooms: "1.5",
    description: "Recherche reprise de bail pour un studio au centre-ville de Lausanne. Idéalement proche de la gare.",
    moveInDate: "2024-05-01",
    contact: {
      name: "Sophie Laurent",
      email: "sophie.laurent@email.ch",
      phone: "+41 78 345 67 89"
    },
    status: "active",
    createdAt: "2024-03-16"
  },
  {
    id: "4",
    type: "colocation",
    title: "Demande de colocation - Quartier universitaire",
    location: {
      canton: "GE",
      npa: "1205",
      city: "Genève"
    },
    budget: "900",
    rooms: "1",
    description: "Étudiante en médecine cherche une chambre dans une colocation sympa proche de l'université. Ambiance conviviale souhaitée.",
    moveInDate: "2024-08-01",
    contact: {
      name: "Emma Blanc",
      email: "emma.blanc@email.ch",
      phone: "+41 79 456 78 90"
    },
    status: "active",
    createdAt: "2024-03-16"
  }
];