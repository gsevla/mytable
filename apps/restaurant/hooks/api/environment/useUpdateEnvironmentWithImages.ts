import { MutationOptions } from '@mytable/api-service';
import { UpdateEnvironmentWithImagesInput } from '@mytable/domain';
import { useApiService } from '#/hooks/api/useApiService';

export function useUpdateEnvironmentWithImages(
  options: MutationOptions<UpdateEnvironmentWithImagesInput> = {}
) {
  const apiService = useApiService();

  return apiService.resources.environment.mutations.useUpdateEnvironmentWithImages(
    options
  );
}
