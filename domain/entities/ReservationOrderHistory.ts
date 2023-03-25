import { ReservationOrderStatus } from 'enums/ReservationOrderStatus';

export type ReservationOrderHistory = {
  id: number;
  reservationOrderId: number;
  status: ReservationOrderStatus;
  employeeId: number;
  createdAt: string; // DateTime
  peopleAmount: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
};
