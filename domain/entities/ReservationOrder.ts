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

export type CreateReservationOrderInput = Omit<
  ReservationOrder,
  'id' | 'restaurantId' | 'status' | 'createdAt' | 'modifiedAt'
>;

export type UpdateReservationOrderInput = Partial<
  Omit<ReservationOrder, 'restaurantId' | 'createdAt' | 'modifiedAt'>
> & {
  id: number;
  reason?: string;
};

export type ReservationOrderWithClientData = ReservationOrder & {
  client: {
    name: string;
    surname: string;
    identifier: string;
  };
};
