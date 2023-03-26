import { QueryOptions } from '@mytable/api-service';
import { useApiService } from '#/hooks/api/useApiService';

export function useEnvironmentById(id: number, options: QueryOptions = {}) {
  const apiService = useApiService();

  return apiService.resources.environment.queries.useEnvironmentWithId(
    id,
    options
  );
}
