import { QueryOptions } from '@mytable/api-service';
import { useApiService } from '../useApiService';

export function useEnvironmentByIdWithImages(
  id: number,
  options: QueryOptions = {}
) {
  const apiService = useApiService();

  return apiService.resources.environment.queries.useEnvironmentWithIdWithImages(
    id,
    options
  );
}
