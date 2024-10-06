import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    const users = await this.authService.findAllUsers();

    channel.ack(message);

    return users;
  }

  @MessagePattern({ cmd: 'register' })
  async register(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    const user = await this.authService.saveUser();

    channel.ack(message);

    return user;
  }
}