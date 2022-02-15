import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';

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

  signInAuthorization(token: string) {
    const v = this.jwtService.verify(token);
    console.log('v', v);

    const decodedToken = this.jwtService.decode(token);

    console.log('u', decodedToken);

    return decodedToken;
  }
}
