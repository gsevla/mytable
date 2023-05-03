import { MutationOptions } from '@mytable/api-service';
import { Restaurant } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useUpdateRestaurant(options: MutationOptions<Restaurant> = {}) {
  const apiService = useApiService();

  return apiService.resources.restaurant.mutations.useUpdateRestaurant(options);
}
