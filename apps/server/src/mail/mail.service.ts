import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendClientAuthorizationEmail(
    email: string,
    name: string,
    token: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'MyTable - Autorização de Autenticação',
      template: 'confirmation',
      context: {
        name,
        mobileUrl: `${process.env.API_URL}/auth/authorization?platform=mobile&token=${token}`, // deve ser uma url web/mobile que dispara chama essa outra
        webUrl: `${process.env.API_URL}/auth/authorization?platform=web&token=${token}`, // deve ser uma url web/mobile que dispara chama essa outra
      },
    });
  }
}
