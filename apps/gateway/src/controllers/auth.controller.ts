import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { SignupUserDto } from '@app/shared';
import { lastValueFrom as sendAsyncMessage} from 'rxjs';

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
  async register(@Body() signupUser: SignupUserDto) {
    try {
      const newUserId = await sendAsyncMessage(this.authService.send({ cmd: 'register' }, signupUser));
      return {
        userId: newUserId
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}