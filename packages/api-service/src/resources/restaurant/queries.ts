import { RestaurantDto } from '@mytable/dtos';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { createRestaurantEndpoints } from './http';
import { restaurantQueryKeys } from './keys';

export function createRestaurantQueries(
  restaurantEndpoints: ReturnType<typeof createRestaurantEndpoints>,
) {
  function useQueryRestaurant() {
    const _queryKey = [restaurantQueryKeys.restaurant];

    return useQuery<RestaurantDto.IRestaurant, AxiosError>(
      _queryKey,
      restaurantEndpoints.getRestaurant,
    );
  }

  return {
    useQueryRestaurant,
  };
}
