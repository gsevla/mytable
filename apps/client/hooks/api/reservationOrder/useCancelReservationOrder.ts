import { MutationOptions } from '@mytable/api-service';
import {
  ReservationOrderStatus,
  UpdateReservationOrderInput,
} from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useCancelReservationOrder(
  options: MutationOptions<UpdateReservationOrderInput> = {}
) {
  const apiService = useApiService();

  const { isLoading, mutate, data } =
    apiService.resources.reservationOrder.mutations.useUpdateReservationOrder(
      options
    );

  return {
    isLoading,
    mutate: (id: number) => {
      mutate({ id, status: ReservationOrderStatus.CANCELED });
    },
    data,
  };
}
