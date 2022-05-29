import { EmployeeRoleEnum } from '@mytable/enums';

export interface IEmployee {
  id: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  role: EmployeeRoleEnum;
  restaurantId: number;
}
