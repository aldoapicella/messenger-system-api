import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Get('user')
  async getUser() {
    try {
      const result = this.authService.send({ cmd: 'get-user' }, {});
      return result;
    } catch (error) {
      console.error('Error while fetching user:', error);
      throw error; 
    }
  }
}