import { Property } from '../types/property';

export const sortProperties = (properties: Property[], sortBy: string): Property[] => {
  const sorted = [...properties];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'area-desc':
      return sorted.sort((a, b) => b.area - a.area);
    case 'newest':
      // Assuming newer properties have higher IDs
      return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    default:
      return sorted;
  }
};