import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RabbitMQModule, UserEntity, PostgresDBModule, RabbitMQService } from '@app/shared';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    RabbitMQModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthenticationService,
    },
    {
      provide: 'IRabbitMQService',
      useClass: RabbitMQService,
    },
  ],
})
export class AuthenticationModule {}
