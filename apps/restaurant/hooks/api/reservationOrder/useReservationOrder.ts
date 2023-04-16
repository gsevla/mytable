import { QueryOptions } from '@mytable/api-service';
import { ReservationOrderWithClientData } from '@mytable/domain';
import { useApiService } from '#/hooks/api/useApiService';

export function useReservationOrder(
  options: QueryOptions<Array<ReservationOrderWithClientData>> = {}
) {
  const apiService = useApiService();

  return apiService.resources.reservationOrder.queries.useReservationOrder(
    options
  );
}
