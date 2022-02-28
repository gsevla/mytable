import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './resources/client/client.module';
import { RestaurantModule } from './resources/restaurant/restaurant.module';

@Module({
  imports: [MailModule, AuthModule, ClientModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
