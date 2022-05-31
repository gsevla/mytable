import { ReservationOrderStatusEnum } from '@mytable/enums';

export const reservationOrderStatusEnumString = {
  [ReservationOrderStatusEnum.accepted]: 'Aceita',
  [ReservationOrderStatusEnum.cancelled]: 'Cancelada',
  [ReservationOrderStatusEnum.done]: 'Finalizada',
  [ReservationOrderStatusEnum.pending]: 'Pendente',
  [ReservationOrderStatusEnum.rejected]: 'Rejeitada',
};
