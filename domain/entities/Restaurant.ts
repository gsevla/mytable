export interface Restaurant {
  id: number;
  name: string;
  ownerName: string;
  address: string;
  coverImage?: string;
  primaryColor: string;
  accentColor: string;
}

export interface UpdateRestaurantInput extends Omit<Restaurant, 'id'>
