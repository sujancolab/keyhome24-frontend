export const stats = {
  overview: {
    totalProperties: 1567,
    totalUsers: 2789,
    totalRequests: 678,
    activeUsers: 234,
    monthlyGrowth: {
      properties: 15,
      users: 18,
      requests: 12,
      activeUsers: 8
    }
  },
  propertyTypes: {
    apartment: 48,
    house: 18,
    villa: 12,
    studio: 8,
    chalet: 6,
    duplex: 4,
    attique: 4
  },
  topLocations: [
    { name: 'Lausanne', count: 312 },
    { name: 'Genève', count: 287 },
    { name: 'Zürich', count: 245 },
    { name: 'Montreux', count: 178 },
    { name: 'Nyon', count: 156 },
    { name: 'Vevey', count: 134 },
    { name: 'Morges', count: 123 },
    { name: 'Fribourg', count: 112 }
  ],
  userActivity: {
    daily: 567,
    weekly: 3450,
    monthly: 14500,
    yearToDate: 42000
  },
  requestTypes: {
    location: 65,
    colocation: 22,
    reprise: 13
  },
  recentActivity: [
    {
      type: 'new_property',
      title: 'Nouvelle annonce',
      description: 'Attique de standing 6.5 pièces à Vevey',
      time: '9:30'
    },
    {
      type: 'new_user',
      title: 'Nouvel utilisateur',
      description: 'Michel Lambert s\'est inscrit',
      time: '10:15'
    },
    {
      type: 'new_request',
      title: 'Nouvelle demande',
      description: 'Recherche appartement proche EPFL',
      time: '11:00'
    }
  ]
};