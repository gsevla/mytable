import { MutationFunction, useMutation } from 'react-query';
import {
  CreateEnvironmentImageInput,
  CreateEnvironmentImageOutput,
  UpdateEnvironmentImageInput,
  UpdateEnvironmentImageOutput,
  EnvironmentImage,
} from '@mytable/domain';
import { MutationOptions } from '../../protocols/MutationOptions';
import { MutationResult } from '../../protocols/QueryClient';
import { createEnvironmentImageEndpoints } from './http';
import { queryClient } from '../../queryClient';
import { environmentImageQueryKeys } from './keys';

export function createEnvironmentImageMutations({
  createEnvironmentImage,
  updateEnvironmentImage,
}: ReturnType<typeof createEnvironmentImageEndpoints>) {
  function useCreateEnvironmentImage(
    options: MutationOptions = {}
  ): MutationResult<CreateEnvironmentImageOutput, CreateEnvironmentImageInput> {
    const { data, isLoading, mutate } = useMutation<
      CreateEnvironmentImageOutput,
      unknown,
      CreateEnvironmentImageInput
    >(
      createEnvironmentImage as unknown as MutationFunction<
        CreateEnvironmentImageOutput,
        CreateEnvironmentImageInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([
            environmentImageQueryKeys.environmentImage,
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

  function useUpdateEnvironmentImage(
    options: MutationOptions = {}
  ): MutationResult<UpdateEnvironmentImageOutput, UpdateEnvironmentImageInput> {
    const { data, isLoading, mutate } = useMutation<
      EnvironmentImage,
      unknown,
      UpdateEnvironmentImageInput
    >(
      updateEnvironmentImage as unknown as MutationFunction<
        EnvironmentImage,
        UpdateEnvironmentImageInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([
            environmentImageQueryKeys.environmentImage,
          ]);
          queryClient.invalidateQueries([
            environmentImageQueryKeys.environmentImage,
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
    useCreateEnvironmentImage,
    useUpdateEnvironmentImage,
  };
}
