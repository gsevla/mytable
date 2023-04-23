import { MutationOptions } from '@mytable/api-service';
import { ReservationOrder } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useCreateReservationOrder(
  options: MutationOptions<ReservationOrder> = {}
) {
  const apiService = useApiService();

  return apiService.resources.reservationOrder.mutations.useCreateReservationOrder(
    options
  );
}
