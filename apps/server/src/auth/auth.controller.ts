import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Client } from '@prisma/client';
// eslint-disable-next-line
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  signIn(
    @Body()
    body: SignInDto
  ) {
    if (body?.cpf) {
      return this.authService.signInClient(body.cpf);
    }

    if (body?.username && body?.password) {
      return this.authService.signInEmployee(body.username, body.password);
    }

    return null;
  }

  @Post('sign-up')
  signUp(@Body() client: Client) {
    return this.authService.signUpClient(client);
  }

  @Get('authorization')
  signInAuthorization(
    @Query('platform') platform: string,
    @Query('token') token: string,
    @Res() res: Response
  ) {
    const url: string = this.authService.signInAuthorization(platform, token);

    res.redirect(url);
  }
}
