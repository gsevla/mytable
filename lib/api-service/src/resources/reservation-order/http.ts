import {
  CreateReservationOrderInput,
  ReservationOrderWithClientData,
  UpdateReservationOrderInput,
} from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createReservationOrderEndpoints(
  httpClient: HttpClientProtocol
) {
  const url = '/reservation-order';

  function createReservationOrder(
    reservationOrder: CreateReservationOrderInput
  ) {
    return httpClient.post<ReservationOrderWithClientData>(
      url,
      reservationOrder
    );
  }

  function getAllReservationOrder() {
    return httpClient.get<Array<ReservationOrderWithClientData>>(url);
  }

  function getReservationOrderById(id: number) {
    return httpClient.get<ReservationOrderWithClientData>(`${url}/${id}`);
  }

  function updateReservationOrder({
    id,
    ...reservationOrder
  }: UpdateReservationOrderInput) {
    return httpClient.patch<ReservationOrderWithClientData>(
      `${url}/${id}`,
      reservationOrder
    );
  }

  return {
    createReservationOrder,
    getAllReservationOrder,
    getReservationOrderById,
    updateReservationOrder,
  };
}
