import { QueryOptions } from '@mytable/api-service';
import { RestaurantWithInfo } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useRestaurantWithInfo(
  options: QueryOptions<RestaurantWithInfo> = {}
) {
  const apiService = useApiService();

  return apiService.resources.restaurant.queries.useRestaurantWithInfo(options);
}
