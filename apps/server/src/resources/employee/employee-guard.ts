import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { EmployeeRole } from '@mytable/domain';

@Injectable()
export class EmployeeGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const superCanActivate = await super.canActivate(context);
    if (!superCanActivate) return false;

    const request = context.switchToHttp().getRequest();

    const { user } = request;

    const isEnabled = user?.enabled;
    if (!isEnabled) return false;

    const isClient = !!user?.role === false;
    if (isClient) return false;

    const scopes = this.reflector.get<EmployeeRole[]>(
      'scopes',
      context.getClass()
    );
    if (!scopes) return true;

    return scopes.includes(user.role);
  }
}
