import { EmployeeRole } from '../enums/EmployeeRole';

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
> & {
  role?: EmployeeRole;
};

export type CreateEmployeeOutput = EmployeeWithoutPassword;

export type UpdateEmployeeInput = Partial<Omit<Employee, 'restaurantId'>> & {
  id: number;
};

export type UpdateEmployeeOutput = EmployeeWithoutPassword;

export type DeleteEmployeeInput = number;

export type DeleteEmployeeOutput = void;

export type AuthenticateEmployeeInput = {
  username: string;
  password: string;
};
