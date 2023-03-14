import { SetMetadata } from '@nestjs/common';
import { EmployeeRole } from '@mytable/domain';

export const EmployeeRoleScope = (...scopes: EmployeeRole[]) =>
  SetMetadata('scopes', scopes);
