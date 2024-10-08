import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@app/shared';

import { GatewayController, AuthController, PresenceController } from './controllers';
@Module({
  imports: [
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    RabbitMQModule.registerRmq('PRESENCE_SERVICE', process.env.RABBITMQ_PRESENCE_QUEUE)
  ],
  controllers: [
    GatewayController,
    AuthController,
    PresenceController,
  ]
})
export class GatewayModule {}