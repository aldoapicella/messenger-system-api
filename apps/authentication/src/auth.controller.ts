import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext, RpcException } from '@nestjs/microservices';

import { IRabbitMQService, SignupUserDto, sendRpcException } from '@app/shared';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    @Inject('IRabbitMQService')
    private readonly rabbitMQService: IRabbitMQService,
    private readonly authService: AuthService,
  ) {}
  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {

    const users = await this.authService.findAllUsers();

    this.rabbitMQService.acknowledgeMessage(context);

    return users;
  }

  @MessagePattern({ cmd: 'register' })
  async register(@Ctx() context: RmqContext, @Payload() user: SignupUserDto) {
    try {
      this.rabbitMQService.acknowledgeMessage(context);
      const result = await this.authService.registerUser(user);
      return result;
    } catch (error) {
      sendRpcException(error);
    }
  }
}