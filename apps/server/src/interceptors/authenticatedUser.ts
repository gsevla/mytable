import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
