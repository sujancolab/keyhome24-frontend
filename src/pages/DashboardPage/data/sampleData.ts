import { UserListing } from '../types';

export const sampleListings: UserListing[] = [
  {
    id: '1',
    title: 'Appartement 3.5 pièces avec balcon',
    location: 'Lausanne, Vaud',
    price: '450,000 CHF',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    views: 245,
    status: 'active',
    hasBeenEdited: false,
    description: 'Magnifique appartement lumineux avec vue dégagée...'
  },
  {
    id: '2',
    title: 'Studio meublé centre-ville',
    location: 'Genève, Genève',
    price: '850 CHF/mois',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    views: 127,
    status: 'pending',
    hasBeenEdited: false,
    description: 'Studio entièrement rénové au cœur de la ville...'
  },
  {
    id: '3',
    title: 'Villa contemporaine avec piscine',
    location: 'Montreux, Vaud',
    price: '2,450,000 CHF',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    views: 89,
    status: 'active',
    hasBeenEdited: false,
    description: 'Superbe villa moderne avec vue sur le lac...'
  }
];

export const sampleRequests = [
  {
    id: '1',
    type: 'location',
    title: 'Recherche 4.5 pièces pour famille',
    location: {
      city: 'Lausanne',
      canton: 'VD'
    },
    budget: '2500',
    status: 'active',
    moveInDate: '2024-07-01',
    description: 'Famille de 4 personnes cherche appartement spacieux proche des écoles et des transports publics.',
    rooms: '4.5'
  },
  {
    id: '2',
    type: 'colocation',
    title: 'Chambre en colocation - Quartier universitaire',
    location: {
      city: 'Genève',
      canton: 'GE'
    },
    budget: '1000',
    status: 'pending',
    moveInDate: '2024-09-01',
    description: 'Étudiant en master cherche une chambre en colocation dans un appartement partagé.',
    rooms: '1'
  }
];