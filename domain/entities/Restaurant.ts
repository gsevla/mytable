export interface Restaurant {
  id: number;
  name: string;
  ownerName: string;
  address: string;
  coverImage?: string;
  primaryColor: string;
  accentColor: string;
}

export type UpdateRestaurantInput = Omit<Restaurant, 'id'>;
