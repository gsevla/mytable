import { useQuery } from 'react-query';
import { QueryOptions } from '../../protocols/QueryOptions';
import { createRestaurantEndpoints } from './http';
import { restaurantQueryKeys } from './keys';

export function createRestaurantQueries(
  restaurantEndpoints: ReturnType<typeof createRestaurantEndpoints>
) {
  function useRestaurant(options: QueryOptions = {}) {
    const queryKey = [restaurantQueryKeys.restaurant];

    return useQuery(queryKey, restaurantEndpoints.getRestaurant, {
      ...options,
    });
  }

  return {
    useRestaurant,
  };
}
