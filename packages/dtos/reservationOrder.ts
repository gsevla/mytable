import { ReservationOrderStatusEnum } from '@mytable/enums';

export interface IReservationOrder {
  id: number;
  clientId: number;
  employeeId: number;
  restaurantId: number;
  date: Date;
  startTime: string;
  endTime: string;
  createdAt: Date;
  modifiedAt: Date;
  modifiedBy: number;
  status: ReservationOrderStatusEnum;
}
