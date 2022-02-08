import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service'; 
import { AppService } from './app.service';
import { User } from './users/entities/users.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user:User){
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: User){
    return this.authService.register(user);
  }
}
