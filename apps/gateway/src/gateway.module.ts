import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayController } from './gateway.controller';
import { SharedModule } from '@app/shared';
import { RabbitMQConfigService } from '@app/shared/config';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
  ],
  controllers: [
    GatewayController,
    AuthController,],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (rabbitMQConfigService: RabbitMQConfigService) => {
        const queue = process.env.RABBITMQ_AUTH_QUEUE;
        return rabbitMQConfigService.createClient(queue);
      },
      inject: [RabbitMQConfigService],
    },
  ],
})
export class GatewayModule {}