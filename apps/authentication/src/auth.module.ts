import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RabbitMQModule, UserEntity, PostgresDBModule, RabbitMQService } from '@app/shared';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    RabbitMQModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IRabbitMQService',
      useClass: RabbitMQService,
    },
  ],
})
export class AuthModule {}
