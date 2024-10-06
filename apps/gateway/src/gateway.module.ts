import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayController } from './gateway.controller';
import { SharedModule } from '@app/shared';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE)
  ],
  controllers: [
    GatewayController,
    AuthController,]
})
export class GatewayModule {}