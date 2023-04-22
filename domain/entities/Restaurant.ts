import { EnvironmentWithImage } from './Environment';
import { WorkingDay } from './WorkingDay';

export interface Restaurant {
  id: number;
  name: string;
  ownerName: string;
  address: string;
  coverImage?: string;
  primaryColor: string;
  accentColor: string;
}

export type UpdateRestaurantInput = Partial<Omit<Restaurant, 'id'>> & {
  id: number;
};

export type RestaurantWithInfo = Restaurant & {
  workingDays: Array<WorkingDay>;
  environments: Array<EnvironmentWithImage>;
};
