import { JoinWaitingQueueInput, LeaveWaitingQueueInput } from '@mytable/domain';
import { MutationFunction, useMutation } from 'react-query';
import { MutationOptions } from '../../protocols/MutationOptions';
import { MutationResult } from '../../protocols/QueryClient';
import { createWaitingQueueEndpoints } from './http';

export function createWaitingQueueMutations(
  endpoints: ReturnType<typeof createWaitingQueueEndpoints>
) {
  function useJoinWaitingQueue(
    options: MutationOptions<void> = {}
  ): MutationResult<void, JoinWaitingQueueInput> {
    const { data, isLoading, mutate } = useMutation<
      void,
      unknown,
      JoinWaitingQueueInput
    >(
      endpoints.joinWaitingQueue as unknown as MutationFunction<
        void,
        JoinWaitingQueueInput
      >,
      options
    );

    return {
      data: data?.data,
      isLoading,
      mutate,
    };
  }

  function useLeaveWaitingQueue(
    options: MutationOptions<void> = {}
  ): MutationResult<void, LeaveWaitingQueueInput> {
    const { data, isLoading, mutate } = useMutation<
      void,
      unknown,
      LeaveWaitingQueueInput
    >(
      endpoints.leaveWaitingQueue as unknown as MutationFunction<
        void,
        LeaveWaitingQueueInput
      >,
      options
    );

    return {
      data: data?.data,
      isLoading,
      mutate,
    };
  }

  return {
    useJoinWaitingQueue,
    useLeaveWaitingQueue,
  };
}
