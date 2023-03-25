import { ReservationOrderStatus } from '@mytable/domain';

export const reservationOrderStatusEnumString = {
  [ReservationOrderStatus.ACCEPTED]: 'Aceita',
  [ReservationOrderStatus.CANCELED]: 'Cancelada',
  [ReservationOrderStatus.DONE]: 'Finalizada',
  [ReservationOrderStatus.PENDING]: 'Pendente',
  [ReservationOrderStatus.REJECTED]: 'Rejeitada',
};
