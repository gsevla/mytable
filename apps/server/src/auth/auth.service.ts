import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Client, Employee } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/resources/client/client.service';
import { decryptPassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private clientService: ClientService
  ) {}

  private async validateClient(cpf: string): Promise<Client | null> {
    const dbClient = await this.prismaService.client.findUnique({
      where: {
        cpf,
      },
    });

    if (!dbClient) {
      throw new UnauthorizedException(
        'Verifique seus dados e tente novamente.',
        'Acesso não autorizado!'
      );
    }

    return dbClient;
  }

  private async validateEmployee(
    username: string,
    password: string
  ): Promise<Employee | null> {
    const dbEmployee = await this.prismaService.employee.findUnique({
      where: {
        username,
      },
    });

    if (!dbEmployee) {
      throw new UnauthorizedException(
        'Verifique seus dados e tente novamente.',
        'Acesso não autorizado!'
      );
    }

    const passwordMatch = await decryptPassword(password, dbEmployee.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Verifique seus dados e tente novamente.',
        'Acesso não autorizado!'
      );
    }

    delete dbEmployee.password;

    return dbEmployee;
  }

  async signInClient(cpf: string) {
    cpf = cpf.split('.').join('').split('-').join('');

    const dbClient = await this.validateClient(cpf);

    const payload = {
      clientId: dbClient.id,
      clientName: dbClient.name,
      clientIdentifier: dbClient.identifier,
    };
    const accessToken = this.jwtService.sign(payload);

    await this.mailService.sendClientAuthorizationEmail(
      dbClient.email,
      dbClient.name,
      accessToken
    );
    return dbClient;
  }

  async signInEmployee(username: string, password: string) {
    const dbEmployee = await this.validateEmployee(username, password);

    const payload = {
      employeeId: dbEmployee.id,
      employeeName: dbEmployee.name,
      dbEmployeeUsername: dbEmployee.username,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      employee: dbEmployee,
      accessToken,
    };
  }

  async signUpClient(client: Client) {
    return this.clientService.createClient(client);
  }

  signInAuthorization(platform: string, token: string) {
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
