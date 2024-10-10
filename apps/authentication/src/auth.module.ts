import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RabbitMQModule, UserEntity, PostgresDBModule, RabbitMQService } from '@app/shared';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserCommandService } from '../../accounts/src/modules/user/services/user-command.service';

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
    AuthService,
    {
      provide: 'IRabbitMQService',
      useClass: RabbitMQService,
    },
    UserCommandService
  ],
})
export class AuthModule {}
