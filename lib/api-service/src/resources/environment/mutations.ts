import { MutationFunction, useMutation } from 'react-query';
import {
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
  Environment,
} from '@mytable/domain';
import { MutationOptions } from '../../protocols/MutationOptions';
import { MutationResult } from '../../protocols/QueryClient';
import { createEnvironmentEndpoints } from './http';
import { queryClient } from '../../queryClient';
import { environmentQueryKeys } from './keys';

export function createEnvironmentMutations({
  createEnvironment,
  updateEnvironment,
}: ReturnType<typeof createEnvironmentEndpoints>) {
  function useCreateEnvironment(
    options: MutationOptions = {}
  ): MutationResult<CreateEnvironmentOutput, CreateEnvironmentInput> {
    const { data, isLoading, mutate } = useMutation<
      CreateEnvironmentOutput,
      unknown,
      CreateEnvironmentInput
    >(
      createEnvironment as unknown as MutationFunction<
        CreateEnvironmentOutput,
        CreateEnvironmentInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([environmentQueryKeys.environment]);
          queryClient.invalidateQueries([
            environmentQueryKeys.environmentWithImage,
          ]);
          options?.onSuccess?.(output);
        },
      }
    );

    return {
      data,
      isLoading,
      mutate,
    };
  }

  function useUpdateEnvironment(
    options: MutationOptions = {}
  ): MutationResult<UpdateEnvironmentOutput, UpdateEnvironmentInput> {
    const { data, isLoading, mutate } = useMutation<
      Environment,
      unknown,
      UpdateEnvironmentInput
    >(
      updateEnvironment as unknown as MutationFunction<
        Environment,
        UpdateEnvironmentInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([environmentQueryKeys.environment]);
          queryClient.invalidateQueries([
            environmentQueryKeys.environmentWithImage,
          ]);
          queryClient.invalidateQueries([
            environmentQueryKeys.environment,
            output.id,
          ]);
          queryClient.invalidateQueries([
            environmentQueryKeys.environmentWithImage,
            output.id,
          ]);
          options?.onSuccess?.(output);
        },
      }
    );

    return {
      data,
      isLoading,
      mutate,
    };
  }

  return {
    useCreateEnvironment,
    useUpdateEnvironment,
  };
}
