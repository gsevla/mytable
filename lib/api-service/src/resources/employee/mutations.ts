import { MutationFunction, useMutation } from 'react-query';
import {
  CreateEmployeeInput,
  CreateEmployeeOutput,
  DeleteEmployeeInput,
  DeleteEmployeeOutput,
  EmployeeWithoutPassword,
  UpdateEmployeeInput,
  UpdateEmployeeOutput,
} from '#domain/entities/Employee';
import { MutationOptions } from '../../protocols/MutationOptions';
import { MutationResult } from '../../protocols/QueryClient';
import { createEmployeeEndpoints } from './http';
import { queryClient } from '../../queryClient';
import { employeeQueryKeys } from './keys';

export function createEmployeeMutations({
  createEmployee,
  updateEmployee,
  deleteEmployee,
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

  // function useDeleteEmployee(
  //   options: MutationOptions = {}
  // ): MutationResult<DeleteEmployeeOutput, DeleteEmployeeInput> {
  //   const { data, isLoading, mutate } = useMutation<
  //     DeleteEmployeeOutput,
  //     unknown,
  //     DeleteEmployeeInput
  //   >(
  //     deleteEmployee as unknown as MutationFunction<
  //       DeleteEmployeeOutput,
  //       DeleteEmployeeInput
  //     >,
  //     options
  //   );
  //
  //   return {
  //     data,
  //     isLoading,
  //     mutate,
  //   };
  // }

  return {
    useCreateEmployee,
    useUpdateEmployee,
    // useDeleteEmployee,
  };
}
