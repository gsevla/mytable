import { useQuery } from 'react-query';
import { EmployeeWithoutPassword } from '#domain/entities/Employee';
import { HttpOperationResult } from '../../protocols/HttpClient';
import { QueryResult } from '../../protocols/QueryClient';
import { QueryOptions } from '../../protocols/QueryOptions';
import { EmployeeEndpoints } from './http';
import { employeeQueryKeys } from './keys';

export function createEmployeeQueries(employeeEndpoints: EmployeeEndpoints) {
  function useEmployee(
    options: QueryOptions = {}
  ): QueryResult<Array<EmployeeWithoutPassword>> {
    const key = [employeeQueryKeys.employee];

    const { data, isLoading } = useQuery<
      HttpOperationResult<Array<EmployeeWithoutPassword>>,
      unknown,
      Array<EmployeeWithoutPassword>
    >(key, () => employeeEndpoints.getAllEmployee(), options);

    return {
      data,
      isLoading,
    };
  }

  function useEmployeeWithId(
    id: number,
    options: QueryOptions = {}
  ): QueryResult<EmployeeWithoutPassword> {
    const key = [employeeQueryKeys.employee, id];

    const { data, isLoading } = useQuery<
      HttpOperationResult<EmployeeWithoutPassword>,
      unknown,
      EmployeeWithoutPassword
    >(
      key,
      ({ queryKey }) =>
        employeeEndpoints.getEmployeeById(queryKey[1] as number),
      options
    );

    return {
      data,
      isLoading,
    };
  }

  return {
    useEmployee,
    useEmployeeWithId,
  };
}
