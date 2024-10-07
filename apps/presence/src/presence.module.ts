import { Module } from '@nestjs/common';

import { RabbitMQModule, RabbitMQService, SharedModule } from '@app/shared';

import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';

@Module({
  imports: [
    SharedModule,
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
