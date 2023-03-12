import {
  EmployeeWithoutPassword,
  UpdateEmployeeInput,
  CreateEmployeeInput,
  CreateEmployeeOutput,
  UpdateEmployeeOutput,
} from '#domain/entities/Employee';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export class EmployeeEndpoints {
  private httpClient: HttpClientProtocol;

  private url = '/employee';

  constructor(httpClient: HttpClientProtocol) {
    this.httpClient = httpClient;
    console.log('empHttpClient', this.httpClient);
  }

  public createEmployee(employee: CreateEmployeeInput) {
    return this.httpClient.post<CreateEmployeeOutput>(this.url, employee);
  }

  public getAllEmployee() {
    console.log('thi', this);
    return this.httpClient.get<Array<EmployeeWithoutPassword>>(this.url);
  }

  public getEmployeeById(id: number) {
    return this.httpClient.get<EmployeeWithoutPassword>(`${this.url}/${id}`);
  }

  public updateEmployee({ id, ...employee }: UpdateEmployeeInput) {
    return this.httpClient.patch<UpdateEmployeeOutput>(
      `${this.url}/${id.toString()}`,
      { ...employee }
    );
  }

  public deleteEmployee(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}

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
