import { ReservationOrderStatus } from '@mytable/domain';

export const reservationOrderStatusMap = {
  [ReservationOrderStatus.ACCEPTED]: 'Aceito',
  [ReservationOrderStatus.CANCELED]: 'Cancelado',
  [ReservationOrderStatus.DONE]: 'Finalizado',
  [ReservationOrderStatus.PENDING]: 'Pendente',
  [ReservationOrderStatus.REJECTED]: 'Rejeitado',
};
