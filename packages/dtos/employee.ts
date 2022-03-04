export enum EmployeeRoleEnum {
  ADMIN,
  ORDINARY,
}

export interface IEmployee {
  id: number;
  name: string;
  username: string;
  password: string;
  role: EmployeeRoleEnum;
  restaurantId: number;
}
