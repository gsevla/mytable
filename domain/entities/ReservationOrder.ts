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

export type CeateReservationOrderInput = Omit<
  ReservationOrder,
  'id' | 'restaurantId' | 'status' | 'createdAt' | 'modifiedAt'
>;

export type UpdateReservationOrderInput = Omit<
  ReservationOrder,
  'restaurantId' | 'createdAt' | 'modifiedAt'
> & {
  reason?: string;
};
