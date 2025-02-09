export interface UserListing {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  views: number;
  status: 'active' | 'pending';
  hasBeenEdited: boolean;
  description?: string;
}