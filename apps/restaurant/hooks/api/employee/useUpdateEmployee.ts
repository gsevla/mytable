import { MutationOptions } from '@mytable/api-service';
import { useApiService } from '#/hooks/api/useApiService';

export function useUpdateEmployee(
  options: MutationOptions<UpdateEmployeeOutput> = {}
) {
  const apiService = useApiService();

  return apiService.resources.employee.mutations.useUpdateEmployee(options);
}
