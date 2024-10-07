import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { RabbitMQService } from '@app/shared';

import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);
  const rabbitMQService = app.get(RabbitMQService);

  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice(rabbitMQService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();