import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQConfigService } from './config/rabbitmq.config';
import { TypeOrmConfigService } from './config';

@Module({
  imports: [ConfigModule],
  providers: [RabbitMQConfigService, TypeOrmConfigService],
  exports: [RabbitMQConfigService, TypeOrmConfigService],
})
export class SharedModule {}