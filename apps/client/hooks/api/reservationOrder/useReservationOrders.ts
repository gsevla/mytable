import { QueryOptions } from '@mytable/api-service';
import { ReservationOrder } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useReservationOrders(
  options: QueryOptions<ReservationOrder[]> = {}
) {
  const apiService = useApiService();

  return apiService.resources.reservationOrder.queries.useReservationOrder(
    options
  );
}
