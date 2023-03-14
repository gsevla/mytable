import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { EmployeeRole } from '@mytable/domain';

@Injectable()
export class EmployeeRoleGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const superCanActivate = await super.canActivate(context);
    if (!superCanActivate) return false;

    const scopes = this.reflector.get<EmployeeRole[]>(
      'scopes',
      context.getClass()
    );

    if (!scopes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const { user } = request;

    const hasRole = !!user?.role;
    if (!hasRole) return false;

    return scopes.includes(user.role);
  }
}
