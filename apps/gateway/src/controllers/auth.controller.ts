import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Get('users')
  async getUser() {
    return this.authService.send({ cmd: 'get-users' }, {});
  }

  @Post('register')
  async register() {
    return this.authService.send({ cmd: 'register' }, {});
  }
}