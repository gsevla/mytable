import {
  EmployeeWithoutPassword,
  UpdateEmployeeInput,
  CreateEmployeeInput,
  CreateEmployeeOutput,
} from '#domain/entities/Employee';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export class EmployeeEndpoints {
  private httpClient: HttpClientProtocol;

  private url = '/employee';

  constructor(httpClient: HttpClientProtocol) {
    this.httpClient = httpClient;
  }

  public createEmployee(employee: CreateEmployeeInput) {
    return this.httpClient.post<CreateEmployeeOutput>(this.url, employee);
  }

  public getAllEmployee() {
    return this.httpClient.get<Array<EmployeeWithoutPassword>>(this.url);
  }

  public getEmployeeById(id: number) {
    return this.httpClient.get<EmployeeWithoutPassword>(`${this.url}/${id}`);
  }

  public updateEmployee({ id, ...employee }: UpdateEmployeeInput) {
    return this.httpClient.patch(`${this.url}/${id.toString()}`, employee);
  }

  public deleteEmployee(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
