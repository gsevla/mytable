import { QueryOptions } from '@mytable/api-service';
import { EmployeeWithoutPassword } from '@mytable/domain';
import { useApiService } from '#/hooks/api/useApiService';

export function useEmployeeById(id: number, options: QueryOptions = {}) {
  const apiService = useApiService();

  return apiService.resources.employee.queries.useEmployeeWithId(id, options);

  return apiService.useQuery<EmployeeWithoutPassword[]>(
    () => apiService?.resources.employee.endpoints.getEmployeeById(id),
    options
  );
}
