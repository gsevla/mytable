import { IEmployee } from './employee';

export interface IRestaurant {
  id: number;
  name: string;
  ownerName: string;
  address: string;
  coverImage?: string;
  primaryColor: string;
  accentColor: string;
  Employee: Array<IEmployee>;
}
