import { MutationOptions } from '@mytable/api-service';
import { EmployeeWithoutPassword } from '@mytable/domain';
import { useApiService } from '#/hooks/api/useApiService';

export function useEmployee(options: MutationOptions = {}) {
  const apiService = useApiService();

  return apiService.resources.employee.queries.useEmployee(options);

  return apiService.useQuery<EmployeeWithoutPassword[]>(
    () => apiService?.resources.employee.endpoints.getAllEmployee(),
    options
  );
}
