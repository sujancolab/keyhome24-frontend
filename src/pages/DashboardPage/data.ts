import { UserListing } from './types';

export const userListings: UserListing[] = [
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
  }
];