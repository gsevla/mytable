import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientModule } from 'src/resources/client/client.module';

@Module({
  imports: [
    MailModule,
    PassportModule,
    JwtModule.register({
      secret: 'ThisIsMySecret',
      signOptions: {
        expiresIn: '120s',
      },
    }),
    ClientModule,
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
