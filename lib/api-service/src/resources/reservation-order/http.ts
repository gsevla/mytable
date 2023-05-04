import {
  CreateReservationOrderInput,
  CreateReservationOrderWithClientIdentifierInput,
  ReservationOrder,
  ReservationOrderWithClientData,
  ReservationOrderWithEnvironmentData,
  ReservationOrderWithReservationOrderHistoryData,
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

  function createReservationOrderWithClientIdentifier(
    reservationOrder: CreateReservationOrderWithClientIdentifierInput
  ) {
    return httpClient.post<ReservationOrderWithClientData>(
      `${url}/with-client-identifier`,
      reservationOrder
    );
  }

  function getAllReservationOrder() {
    return httpClient.get<Array<ReservationOrderWithClientData>>(url);
  }

  function getAllActiveReservationOrder() {
    return httpClient.get<
      Array<
        ReservationOrderWithEnvironmentData | ReservationOrderWithClientData
      >
    >(`${url}/active`);
  }

  function getAllReservationOrderHistory() {
    return httpClient.get<
      Array<
        | (ReservationOrderWithEnvironmentData &
            ReservationOrderWithReservationOrderHistoryData)
        | ReservationOrderWithClientData
      >
    >(`${url}/history`);
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
    getAllActiveReservationOrder,
    getAllReservationOrderHistory,
    getReservationOrderById,
    updateReservationOrder,
    createReservationOrderWithClientIdentifier,
  };
}
