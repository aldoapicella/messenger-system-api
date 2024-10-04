import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RabbitMQConfigService } from '@app/shared/config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rabbitMQConfigService = app.get(RabbitMQConfigService);
  const configService = app.get(ConfigService);

  const queue = configService.get('RABBITMQ_AUTH_QUEUE');
  const microserviceOptions = rabbitMQConfigService.createClientOptions(queue, false);

  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
}
bootstrap();