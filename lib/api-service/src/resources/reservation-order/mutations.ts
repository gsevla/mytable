import {
  CreateReservationOrderInput,
  ReservationOrderWithClientData,
  UpdateReservationOrderInput,
} from '@mytable/domain';
import { MutationFunction, useMutation } from 'react-query';
import { MutationResult } from '../../protocols/QueryClient';
import { createReservationOrderEndpoints } from './http';
import { MutationOptions } from '../../protocols/MutationOptions';
import { queryClient } from '../../queryClient';
import { reservationOrderQueryKeys } from './keys';

export function createReservationOrderMutations(
  reservationOrderEndpoints: ReturnType<typeof createReservationOrderEndpoints>
) {
  function useCreateReservationOrder(
    options: MutationOptions<ReservationOrderWithClientData> = {}
  ): MutationResult<
    ReservationOrderWithClientData,
    CreateReservationOrderInput
  > {
    const { data, isLoading, mutate } = useMutation<
      ReservationOrderWithClientData,
      unknown,
      CreateReservationOrderInput
    >(
      reservationOrderEndpoints.createReservationOrder as unknown as MutationFunction<
        ReservationOrderWithClientData,
        CreateReservationOrderInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([
            reservationOrderQueryKeys.reservationOrder,
          ]);
          options?.onSuccess?.(output);
        },
      }
    );

    return {
      data: data?.data,
      isLoading,
      mutate,
    };
  }

  function useUpdateReservationOrder(
    options: MutationOptions<ReservationOrderWithClientData> = {}
  ): MutationResult<
    ReservationOrderWithClientData,
    UpdateReservationOrderInput
  > {
    const { data, isLoading, mutate } = useMutation<
      ReservationOrderWithClientData,
      unknown,
      UpdateReservationOrderInput
    >(
      reservationOrderEndpoints.updateReservationOrder as unknown as MutationFunction<
        ReservationOrderWithClientData,
        UpdateReservationOrderInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([
            reservationOrderQueryKeys.reservationOrder,
          ]);
          queryClient.invalidateQueries([
            reservationOrderQueryKeys.reservationOrderById,
            output.id,
          ]);
          options?.onSuccess?.(output);
        },
      }
    );

    return {
      data: data?.data,
      isLoading,
      mutate,
    };
  }

  return {
    useCreateReservationOrder,
    useUpdateReservationOrder,
  };
}
