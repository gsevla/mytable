import { MutationOptions } from '@mytable/api-service';
import { useApiService } from '../useApiService';

export function useAttendWaitingQueue(options: MutationOptions<void> = {}) {
  const apiService = useApiService();

  return apiService.resources.waitingQueue.mutations.useAttendWaitingQueue(
    options
  );
}
