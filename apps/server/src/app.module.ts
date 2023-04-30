import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sync as findUpSync } from 'find-up';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './resources/auth/auth.module';
import { ClientModule } from './resources/client/client.module';
import { RestaurantModule } from './resources/restaurant/restaurant.module';
import { EmployeeModule } from './resources/employee/employee.module';
import { WorkingDayModule } from './resources/working-day/working-day.module';
import { EnvironmentModule } from './resources/environment/environment.module';
import { EnvironmentImageModule } from './resources/environment-image/environment-image.module';
import { ReservationOrderModule } from './resources/reservation-order/reservation-order.module';
import { ReservationOrderHistoryModule } from './resources/reservation-order-history/reservation-order-history.module';
import { AuthValidator } from './resources/auth/validator';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: findUpSync('.env'),
    }),
    EventsModule,
    MailModule,
    AuthModule,
    ClientModule,
    RestaurantModule,
    EmployeeModule,
    WorkingDayModule,
    EnvironmentModule,
    EnvironmentImageModule,
    ReservationOrderModule,
    ReservationOrderHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthValidator],
})
export class AppModule {}
