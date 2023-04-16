import { MutationOptions } from '@mytable/api-service';
import { UpdateReservationOrderInput } from '@mytable/domain';
import { useApiService } from '#/hooks/api/useApiService';

export function useUpdateReservationOrder(
  options: MutationOptions<UpdateReservationOrderInput> = {}
) {
  const apiService = useApiService();

  return apiService.resources.reservationOrder.mutations.useUpdateReservationOrder(
    options
  );
}
