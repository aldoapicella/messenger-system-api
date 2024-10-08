import { Module } from '@nestjs/common';

import { RabbitMQModule, RabbitMQService } from '@app/shared';

import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';

@Module({
  imports: [
    RabbitMQModule,
  ],
  controllers: [PresenceController],
  providers: [
    PresenceService,
    {
      provide: 'IRabbitMQService',
      useClass: RabbitMQService,
    }
  ],
})
export class PresenceModule {}
