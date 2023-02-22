import { EmployeeRole } from '#domain/enums/EmployeeRole';

export interface Employee {
  id: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  role: EmployeeRole;
  enabled: boolean;
  restaurantId: number;
}

export type EmployeeWithoutPassword = Omit<Employee, 'password'>;

export type CreateEmployeeInput = Omit<
  Employee,
  'id' | 'enabled' | 'role' | 'restaurantId'
>;

export type CreateEmployeeOutput = EmployeeWithoutPassword;

export type UpdateEmployeeInput = Omit<Employee, 'id' | 'restaurantId'>;

export type UpdateEmployeeOutput = EmployeeWithoutPassword;
