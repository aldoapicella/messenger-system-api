import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { RabbitMQService } from '@app/shared';

import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);

  const configService = app.get(ConfigService);
  const rabbitMQService = app.get(RabbitMQService);

  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice(rabbitMQService.getRmqOptions(queue));
  app.startAllMicroservices();
}
bootstrap();