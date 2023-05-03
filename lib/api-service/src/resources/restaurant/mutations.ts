import { Restaurant, UpdateRestaurantInput } from '@mytable/domain';
import { MutationFunction, useMutation } from 'react-query';
import { MutationOptions } from '../../protocols/MutationOptions';
import { createRestaurantEndpoints } from './http';
import { MutationResult } from '../../protocols/QueryClient';
import { queryClient } from '../../queryClient';
import { restaurantQueryKeys } from './keys';

export function createRestaurantMutations(
  endpoints: ReturnType<typeof createRestaurantEndpoints>
) {
  function useUpdateRestaurant(
    options: MutationOptions<Restaurant> = {}
  ): MutationResult<Restaurant, UpdateRestaurantInput> {
    const { data, isLoading, mutate } = useMutation<
      Restaurant,
      unknown,
      UpdateRestaurantInput
    >(
      endpoints.updateRestaurant as unknown as MutationFunction<
        Restaurant,
        UpdateRestaurantInput
      >,
      {
        ...options,
        onSuccess: (output) => {
          queryClient.invalidateQueries([restaurantQueryKeys.restaurant]);
          queryClient.invalidateQueries([
            restaurantQueryKeys.restaurantWithInfo,
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
    useUpdateRestaurant,
  };
}
