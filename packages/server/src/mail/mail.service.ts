import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTestMail() {
    await this.mailerService.sendMail({
      to: 'gabrieltots@gmail.com',
      subject: 'teste testando',
      template: 'confirmation',
      context: {
        name: 'Mr. Gabriel',
        url: 'google.com.br',
      },
    });
  }
}
