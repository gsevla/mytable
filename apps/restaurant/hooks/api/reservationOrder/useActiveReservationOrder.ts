import { QueryOptions } from '@mytable/api-service';
import { ReservationOrderWithEnvironmentData } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useActiveReservationOrder(
  options: QueryOptions<Array<ReservationOrderWithEnvironmentData>> = {}
) {
  const apiService = useApiService();

  return apiService.resources.reservationOrder.queries.useActiveReservationOrder(
    options
  );
}
