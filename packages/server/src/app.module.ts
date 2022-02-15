import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [MailModule, AuthModule, ClientModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
