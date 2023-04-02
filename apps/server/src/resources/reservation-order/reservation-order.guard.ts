import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ReservationOrderGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const superCanActivate = await super.canActivate(context);
    if (!superCanActivate) return false;

    // const request = context.switchToHttp().getRequest();

    // const { user } = request;

    return true;
  }
}
