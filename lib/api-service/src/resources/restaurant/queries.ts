import { useQuery } from 'react-query';
import { Restaurant } from '@mytable/domain';
import { QueryOptions } from '../../protocols/QueryOptions';
import { createRestaurantEndpoints } from './http';
import { restaurantQueryKeys } from './keys';
import { QueryResult } from '../../protocols/QueryClient';

export function createRestaurantQueries(
  restaurantEndpoints: ReturnType<typeof createRestaurantEndpoints>
) {
  function useRestaurant(
    options: QueryOptions<Restaurant> = {}
  ): QueryResult<Restaurant> {
    const queryKey = [restaurantQueryKeys.restaurant];

    const { data, isLoading, refetch, isRefetching } = useQuery(
      queryKey,
      restaurantEndpoints.getRestaurant,
      {
        ...options,
      }
    );

    return {
      data: data?.data,
      isLoading,
      isRefetching,
      refetch,
    };
  }

  return {
    useRestaurant,
  };
}
