import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Get('users')
  async getUser() {
    try {
      const result = this.authService.send({ cmd: 'get-users' }, {});
      return result;
    } catch (error) {
      console.error('Error while fetching user:', error);
      throw error; 
    }
  }

  @Post('register')
  async register() {
    try {
      const result = this.authService.send({ cmd: 'register' }, {});
      return result;
    } catch (error) {
      console.error('Error while registering user:', error);
      throw error;
    }
  }
}