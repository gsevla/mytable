import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ThisIsMySecret',
    });
  }

  async validate(payload: {
    clientId: number;
    clientName: string;
    clientIdentifier: string;
  }) {
    const { clientId, clientName, clientIdentifier } = payload;
    return { clientId, clientName, clientIdentifier };
  }
}
