import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

import { IRabbitMQService } from '@app/shared';

import { PresenceService } from './presence.service';

@Controller()
export class PresenceController {
  constructor(
    @Inject('IRabbitMQService')
    private readonly rabbitMQService: IRabbitMQService,
    private readonly presenceService: PresenceService) {}

  @MessagePattern({ cmd: 'get-presence' })
  async getPresence(@Ctx() context: RmqContext) {

      const presence = this.presenceService.getPresence();

      this.rabbitMQService.acknowledgeMessage(context);

      return presence;
  }
}
