import { ReservationOrderStatus } from '@mytable/domain';
import { SocketClientProtocol } from '../../protocols/SocketClient';

export function createReservationOrderEventListeners(
  socketClient: SocketClientProtocol
) {
  const onReservationOrderStatusChanged = 'onReservationOrderStatusChanged';

  function listenToReservationOrderChanges(
    handler: (data: { id: number; status: ReservationOrderStatus }) => void
  ) {
    socketClient.on(onReservationOrderStatusChanged, handler);
    return () =>
      socketClient.removeListener(onReservationOrderStatusChanged, handler);
  }

  return {
    listenToReservationOrderChanges,
  };
}
