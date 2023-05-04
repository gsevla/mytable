import { QueryOptions } from '@mytable/api-service';
import { WaitingQueueClient } from '@mytable/domain';
import { useApiService } from '../useApiService';

export function useWaitingQueue(
  options: QueryOptions<Array<WaitingQueueClient>> = {}
) {
  const apiService = useApiService();

  return apiService.resources.waitingQueue.queries.useWaitingQueue(options);
}
