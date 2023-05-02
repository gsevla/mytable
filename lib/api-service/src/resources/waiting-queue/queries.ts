import { WaitingQueueClient } from '@mytable/domain';
import { useQuery } from 'react-query';
import { QueryOptions } from '../../protocols/QueryOptions';
import { createWaitingQueueEndpoints } from './http';
import { waitingQueueQueryKeys } from './keys';
import { QueryResult } from '../../protocols/QueryClient';
import {
  AwaitedHttpOperationResult,
  HttpOperationResult,
} from '../../protocols/HttpClient';

export function createWaitingQueueQueries(
  endpoints: ReturnType<typeof createWaitingQueueEndpoints>
) {
  function useWaitingQueue(
    options: QueryOptions<
      AwaitedHttpOperationResult<Array<WaitingQueueClient>>
    > = {}
  ): QueryResult<Array<WaitingQueueClient>> {
    const key = [waitingQueueQueryKeys.waitingQueue];

    const { data, isLoading, isRefetching, refetch } = useQuery<
      HttpOperationResult<Array<WaitingQueueClient>>,
      unknown,
      Array<WaitingQueueClient>
    >(key, () => endpoints.getWaitingQueue(), options);

    return {
      data: data?.data,
      isLoading,
      isRefetching,
      refetch,
    };
  }

  return {
    useWaitingQueue,
  };
}
