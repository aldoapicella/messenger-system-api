import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

import { IRabbitMQService } from '@app/shared';

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
  async register(@Ctx() context: RmqContext) {

    const user = await this.authService.saveUser();

    this.rabbitMQService.acknowledgeMessage(context);

    return user;
  }
}