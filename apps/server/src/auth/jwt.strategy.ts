import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthValidator } from './validator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authValidator: AuthValidator) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ThisIsMySecret',
    });
  }

  async validate(payload) {
    try {
      if (payload?.cpf) {
        return await this.authValidator.validateClient(payload.cpf);
      }
      if (payload?.username && payload?.password) {
        return await this.authValidator.validateEmployee(
          payload.username,
          payload.password
        );
      }
    } catch (error) {
      console.log('## jwt-strategy validate error\n', error);
    }
    throw new UnauthorizedException(
      'Verifique seus dados e tente novamente.',
      'Acesso não autorizado!'
    );
  }
}
