export interface Property {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  rooms: number;
  baths: number;
  area: number;
  location: {
    npa: string;
    city: string;
    address: string;
  };
  features: {
    parking: boolean;
    garden: boolean;
  };
  type: string;
  transactionType: 'buy' | 'rent';
}