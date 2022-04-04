import { RestaurantDto } from '@mytable/dtos';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { createRestaurantEndpoints } from './http';
import { restaurantQueryKeys } from './keys';

export function createRestaurantQueries(
  restaurantEndpoints: ReturnType<typeof createRestaurantEndpoints>,
) {
  function useQueryRestaurant(
    options?: UseQueryOptions<
      RestaurantDto.IRestaurant,
      AxiosError<{
        error: string;
        message: string;
        statusCode: number;
      }>
    >,
  ) {
    const _queryKey = [restaurantQueryKeys.restaurant];

    return useQuery<RestaurantDto.IRestaurant, AxiosError>(
      _queryKey,
      restaurantEndpoints.getRestaurant,
      options,
    );
  }

  return {
    useQueryRestaurant,
  };
}
