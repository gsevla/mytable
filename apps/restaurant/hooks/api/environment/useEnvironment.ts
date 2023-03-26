import { MutationOptions } from '@mytable/api-service';
import { useApiService } from '#/hooks/api/useApiService';

export function useEnvironment(options: MutationOptions = {}) {
  const apiService = useApiService();

  return apiService.resources.environment.queries.useEnvironment(options);
}
