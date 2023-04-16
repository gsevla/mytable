import { MutationOptions } from '@mytable/api-service';
import { EmployeeWithoutPassword } from '@mytable/domain';
import { useApiService } from '#/hooks/api/useApiService';

export function useSignInEmployee(
  options: MutationOptions<EmployeeWithoutPassword> = {}
) {
  const apiService = useApiService();

  return apiService.resources.auth.mutations.useSignInEmployee(options);
}
