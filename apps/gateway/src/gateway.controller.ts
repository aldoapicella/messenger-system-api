import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Get('auth')
  async getUser() {
    return this.authService.send({ cmd: 'get-user' }, {});
  }

  @Post('register')
  async registerUser() {
    return this.authService.send({ cmd: 'register-user' }, {});
  }
}
