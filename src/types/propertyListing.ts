export type PropertyCategory = 'residential' | 'commercial' | 'land' | 'parking';

export type PropertyType = 'apartment' | 'house' | 'villa' | 'studio' | 'loft' | 
                         'office' | 'shop' | 'restaurant' | 'warehouse' |
                         'buildingLand' | 'agriculturalLand' |
                         'indoorParking' | 'outdoorParking' | 'garage';

export interface PropertyFormData {
  agencyInfo: {
    name: string;
    address: string;
    location: string;
    email: string;
    phone: string;
  };
  type: 'sell' | 'rent';
  category: PropertyCategory;
  propertyType: PropertyType;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    postalCode: string;
    canton: string;
  };
  features: {
    area: number;
    rooms: number;
    bathrooms: number;
    floor: number;
    totalFloors: number;
    parkingSpaces: number;
    parking: boolean;
    balcony: boolean;
    elevator: boolean;
    custom?: string[];
  };
  media: {
    images: File[];
    documents: File[];
  };
  availability?: string;
}

export const propertyCategories = [
  {
    id: 'residential',
    label: 'Résidentiel',
    types: ['apartment', 'house', 'villa', 'studio', 'loft']
  },
  {
    id: 'commercial',
    label: 'Commercial',
    types: ['office', 'shop', 'restaurant', 'warehouse']
  },
  {
    id: 'land',
    label: 'Terrain',
    types: ['buildingLand', 'agriculturalLand']
  },
  {
    id: 'parking',
    label: 'Parking',
    types: ['indoorParking', 'outdoorParking', 'garage']
  }
] as const;

export const propertyTypeLabels: Record<PropertyType, string> = {
  // Résidentiel
  apartment: 'Appartement',
  house: 'Maison',
  villa: 'Villa',
  studio: 'Studio',
  loft: 'Loft',

  // Commercial
  office: 'Bureau',
  shop: 'Commerce',
  restaurant: 'Restaurant',
  warehouse: 'Entrepôt',

  // Terrain
  buildingLand: 'Terrain à bâtir',
  agriculturalLand: 'Terrain agricole',

  // Parking
  indoorParking: 'Place intérieure',
  outdoorParking: 'Place extérieure',
  garage: 'Garage'
};

export const propertyTypes = Object.entries(propertyTypeLabels).map(([id, label]) => ({
  id,
  label,
  category: propertyCategories.find(cat => 
    cat.types.includes(id as PropertyType)
  )?.id as PropertyCategory
}));