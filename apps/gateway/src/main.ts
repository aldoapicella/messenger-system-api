import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from './common/filters';
import { ResponseInterceptor } from './common/interceptors';

import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(5000);
}
bootstrap();
