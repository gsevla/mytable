import { QueryOptions } from '@mytable/api-service';
import { Restaurant } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useRestaurant(options: QueryOptions<Restaurant> = {}) {
  const apiService = useApiService();

  return apiService.resources.restaurant.queries.useRestaurant(options);
}
