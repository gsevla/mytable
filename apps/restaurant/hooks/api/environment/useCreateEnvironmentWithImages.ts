import { MutationOptions } from '@mytable/api-service';
import { CreateEnvironmentWithImagesInput } from '@mytable/domain';
import { useApiService } from '#/hooks/api/useApiService';

export function useCreateEnvironmentWithImages(
  options: MutationOptions<CreateEnvironmentWithImagesInput> = {}
) {
  const apiService = useApiService();

  return apiService.resources.environment.mutations.useCreateEnvironmentWithImages(
    options
  );
}
