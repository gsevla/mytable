import { ReservationOrderStatusEnum } from '@mytable/enums';

export const reservationOrderStatusEnumString = {
  [ReservationOrderStatusEnum.accepted]: 'Aceito',
  [ReservationOrderStatusEnum.cancelled]: 'Cancelado',
  [ReservationOrderStatusEnum.done]: 'Finalizado',
  [ReservationOrderStatusEnum.pending]: 'Pendente',
  [ReservationOrderStatusEnum.rejected]: 'Rejeitado',
};
