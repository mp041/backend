import { Body, Controller, Get, Post, Request, UseGuards,Res, HttpStatus } from '@nestjs/common';
// import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
// import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
// import { UsersService } from './users/users.service';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly authService : AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req):any{
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string {
    console.log();

    return req.user;
  }





}
