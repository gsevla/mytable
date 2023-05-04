import { MutationOptions } from '@mytable/api-service';
import { WorkingDay } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useUpdateWorkingDay(options: MutationOptions<WorkingDay> = {}) {
  const apiService = useApiService();

  return apiService.resources.workingDay.mutations.useUpdateWorkingDay(options);
}
