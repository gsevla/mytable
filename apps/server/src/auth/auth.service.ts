import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/resources/client/client.service';
import { AuthValidator } from './validator';
import { SignUpClientDto } from './dto/sign-up-client.dto';

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
    private authValidator: AuthValidator,
    private jwtService: JwtService,
    private clientService: ClientService
  ) {}

  async signInClient(cpf: string) {
    const normalizedCpf = cpf.split('.').join('').split('-').join('');

    const client = await this.authValidator.validateClient(normalizedCpf);
    const accessToken = this.jwtService.sign({ cpf: normalizedCpf });

    await this.mailService.sendClientAuthorizationEmail(
      client.email,
      client.name,
      accessToken
    );

    return {
      client,
      // accessToken,
    };
  }

  async signInEmployee(username: string, password: string) {
    const employee = await this.authValidator.validateEmployee(
      username,
      password
    );
    const accessToken = this.jwtService.sign({ username, password });

    return {
      employee,
      accessToken,
    };
  }

  async signUpClient(client: SignUpClientDto) {
    return this.clientService.createClient(client);
  }

  static signInAuthorization(platform: string, token: string) {
    const platforms = {
      mobile: `${process.env.CLIENT_MOBILE_LINK}/--/auth/authorization/?token=${token}`,
      web: `${process.env.CLIENT_WEB_LINK}/auth/authorization?token=${token}`,
    };

    const url = platforms[platform] as string | undefined;

    if (!url) {
      // return url for page not found
      return '';
    }

    return url;
  }
}
