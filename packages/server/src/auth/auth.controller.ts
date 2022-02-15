import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Client } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  signIn(@Body() client: Client) {
    return this.authService.signInClient(client);
  }

  @Get('authorization')
  signInAuthorization(@Query('token') token: string) {
    return this.authService.signInAuthorization(token);
  }
}
