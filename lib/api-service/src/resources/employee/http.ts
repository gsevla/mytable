import {
  EmployeeWithoutPassword,
  UpdateEmployeeInput,
  CreateEmployeeInput,
  CreateEmployeeOutput,
  UpdateEmployeeOutput,
} from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createEmployeeEndpoints(httpClient: HttpClientProtocol) {
  const url = '/employee';

  function createEmployee(employee: CreateEmployeeInput) {
    return httpClient.post<CreateEmployeeOutput>(url, employee);
  }

  function getAllEmployee() {
    return httpClient.get<Array<EmployeeWithoutPassword>>(url);
  }

  function getEmployeeById(id: number) {
    return httpClient.get<EmployeeWithoutPassword>(`${url}/${id}`);
  }

  function updateEmployee({ id, ...employee }: UpdateEmployeeInput) {
    return httpClient.patch<UpdateEmployeeOutput>(`${url}/${id.toString()}`, {
      ...employee,
    });
  }

  function deleteEmployee(id: number) {
    return httpClient.delete(`${url}/${id}`);
  }

  return {
    createEmployee,
    getAllEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
  };
}
