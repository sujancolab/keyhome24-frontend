export const realUsers = {
  admin: {
    id: 'admin',
    email: 'admin@immofrance.fr',
    password: 'Admin2024!',
    name: 'Jean Dupont',
    role: 'Administrateur',
    department: 'Direction',
    verified: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    phone: '+33 1 23 45 67 89',
    location: 'Paris, France'
  },
  user: {
    id: 'user',
    email: 'sarah.muller@example.com',
    password: 'User2024!',
    name: 'Sarah Muller',
    role: 'Utilisateur',
    verified: true,
    createdAt: '2024-01-02T00:00:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    phone: '+41 76 123 45 67',
    location: 'Lausanne, Suisse',
    listings: ['1', '2'],
    requests: ['1'],
    stats: {
      totalViews: 372,
      favorites: 45,
      lastActivity: '2024-03-15T14:30:00.000Z'
    }
  }
};