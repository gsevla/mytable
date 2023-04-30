import { QueryOptions } from '@mytable/api-service';
import {
  ReservationOrderWithEnvironmentData,
  ReservationOrderWithReservationOrderHistoryData,
} from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useReservationOrderHistory(
  options: QueryOptions<
    Array<
      ReservationOrderWithEnvironmentData &
        ReservationOrderWithReservationOrderHistoryData
    >
  > = {}
) {
  const apiService = useApiService();

  return apiService.resources.reservationOrder.queries.useReservationOrderHistory(
    options
  );
}
