import { MutationOptions } from '@mytable/api-service';
import { UpdateEnvironmentInput } from '@mytable/domain';
import { useApiService } from '#/hooks/api/useApiService';

export function useUpdateEnvironment(
  options: MutationOptions<UpdateEnvironmentInput> = {}
) {
  const apiService = useApiService();

  return apiService.resources.environment.mutations.useUpdateEnvironment(
    options
  );
}
