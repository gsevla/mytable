import { MutationFunction, useMutation } from 'react-query';
import {
  CreateEmployeeInput,
  CreateEmployeeOutput,
  EmployeeWithoutPassword,
  UpdateEmployeeInput,
  UpdateEmployeeOutput,
} from '@mytable/domain';
import { MutationOptions } from '../../protocols/MutationOptions';
import { MutationResult } from '../../protocols/QueryClient';
import { createEmployeeEndpoints } from './http';
import { queryClient } from '../../queryClient';
import { employeeQueryKeys } from './keys';

export function createEmployeeMutations({
  createEmployee,
  updateEmployee,
}: ReturnType<typeof createEmployeeEndpoints>) {
  function useCreateEmployee(
    options: MutationOptions = {}
  ): MutationResult<CreateEmployeeOutput, CreateEmployeeInput> {
    const { data, isLoading, mutate } = useMutation<
      CreateEmployeeOutput,
      unknown,
      CreateEmployeeInput
    >(
      createEmployee as unknown as MutationFunction<
        CreateEmployeeOutput,
        CreateEmployeeInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([employeeQueryKeys.employee]);
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

  function useUpdateEmployee(
    options: MutationOptions = {}
  ): MutationResult<UpdateEmployeeOutput, UpdateEmployeeInput> {
    const { data, isLoading, mutate } = useMutation<
      EmployeeWithoutPassword,
      unknown,
      UpdateEmployeeInput
    >(
      updateEmployee as unknown as MutationFunction<
        EmployeeWithoutPassword,
        UpdateEmployeeInput
      >,
      {
        onSuccess: (output) => {
          queryClient.invalidateQueries([employeeQueryKeys.employee]);
          queryClient.invalidateQueries([
            employeeQueryKeys.employee,
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
    useCreateEmployee,
    useUpdateEmployee,
  };
}
