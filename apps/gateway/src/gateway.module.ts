import { Module } from '@nestjs/common';

import { RabbitMQModule, SharedModule } from '@app/shared';

import { GatewayController } from './gateway.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    SharedModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE)
  ],
  controllers: [
    GatewayController,
    AuthController,]
})
export class GatewayModule {}