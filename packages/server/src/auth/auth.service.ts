import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/resources/client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private clientService: ClientService,
  ) {}

  async validateClient(cpf: string): Promise<Client | null> {
    const dbClient = await this.prismaService.client.findUnique({
      where: {
        cpf,
      },
    });

    return dbClient;
  }

  async signInClient(client: Client) {
    let dbClient = await this.validateClient(client.cpf);
    if (!dbClient) {
      dbClient = await this.signUpClient(client);
    }

    const payload = {
      clientId: dbClient.id,
      clientName: dbClient.name,
      clientIdentifier: dbClient.identifier,
    };
    const accessToken = this.jwtService.sign(payload);

    await this.mailService.sendClientAuthorizationEmail(
      client.email,
      client.name,
      accessToken,
    );
    return true;
  }

  async signUpClient(client: Client) {
    return this.clientService.createClient(client);
  }

  signInAuthorization(platform: string, token: string) {
    const platforms = {
      mobile: `exp://192.168.15.15:19000/--/auth/authorization/?token=${token}`,
      web: `http://192.168.15.15:4200/auth/authorization?token=${token}`,
    };

    const url = platforms[platform];

    if (!url) {
      // return url for page not found
    }

    return url;
  }
}