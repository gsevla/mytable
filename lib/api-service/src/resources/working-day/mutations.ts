import { UpdateWorkingDayInput, WorkingDay } from '@mytable/domain';
import { MutationFunction, useMutation } from 'react-query';
import { MutationOptions } from '../../protocols/MutationOptions';
import { createWorkingDayEndpoints } from './http';
import { MutationResult } from '../../protocols/QueryClient';
import { queryClient } from '../../queryClient';
import { restaurantQueryKeys } from '../restaurant/keys';

export function createWorkingDayMutations(
  endpoints: ReturnType<typeof createWorkingDayEndpoints>
) {
  function useUpdateWorkingDay({
    onSuccess,
    ...options
  }: MutationOptions<WorkingDay> = {}): MutationResult<
    WorkingDay,
    UpdateWorkingDayInput
  > {
    const { data, isLoading, mutate } = useMutation<
      WorkingDay,
      unknown,
      UpdateWorkingDayInput
    >(
      endpoints.updateWorkingDay as unknown as MutationFunction<
        WorkingDay,
        UpdateWorkingDayInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([
            restaurantQueryKeys.restaurantWithInfo,
          ]);
          onSuccess?.(output);
        },
        ...options,
      }
    );

    return {
      data: data?.data,
      isLoading,
      mutate,
    };
  }

  return {
    useUpdateWorkingDay,
  };
}
