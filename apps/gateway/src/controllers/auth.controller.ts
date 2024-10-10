import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { lastValueFrom as sendAsyncMessage} from 'rxjs';

import { IAuthResponse, LoginUserDto, SignupUserDto } from '@app/shared';

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

  @Post('login')
  async login(@Body() loginData: LoginUserDto){//: Promise<IAuthResponse> {
    try {
      const tokenData = 'test';// await sendAsyncMessage(this.authService.send({ cmd: 'login' }, loginData));
      return tokenData;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}