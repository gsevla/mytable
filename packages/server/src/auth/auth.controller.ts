import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Client } from '@prisma/client';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body('cpf') cpf: string) {
    return this.authService.signInClient(cpf);
  }

  @Post('sign-up')
  signUp(@Body() client: Client) {
    return this.authService.signUpClient(client);
  }

  @Get('authorization')
  signInAuthorization(
    @Query('platform') platform: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    const url: string = this.authService.signInAuthorization(platform, token);

    res.redirect(url);
  }
}
