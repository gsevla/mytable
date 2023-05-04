import { ReservationOrderWithClientData } from '@mytable/domain';
import { MutationOptions } from '@mytable/api-service';
import { useApiService } from '../useApiService';

export function useCreateReservationOrderWithClientIdentifier(
  options: MutationOptions<ReservationOrderWithClientData> = {}
) {
  const apiService = useApiService();

  return apiService.resources.reservationOrder.mutations.useCreateReservationOrderWithClientIdentifier(
    options
  );
}
