import { MutationOptions } from '@mytable/api-service';
import { useApiService } from '../useApiService';

export function useJoinWaitingQueue(options: MutationOptions<void> = {}) {
  const apiService = useApiService();

  return apiService.resources.waitingQueue.mutations.useJoinWaitingQueue(
    options
  );
}
