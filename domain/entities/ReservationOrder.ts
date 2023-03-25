import { ReservationOrderStatus } from 'enums/ReservationOrderStatus';

export type ReservationOrder = {
  id: number;
  clientId: number;
  restaurantId: number;
  environmentId: number;
  peopleAmount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: Date; // DateTime
  modifiedAt: Date; // DateTime
  status: ReservationOrderStatus;
};
