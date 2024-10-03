import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQConfigService } from './config/rabbitmq.config';

@Module({
  imports: [ConfigModule],
  providers: [RabbitMQConfigService],
  exports: [RabbitMQConfigService],
})
export class SharedModule {}