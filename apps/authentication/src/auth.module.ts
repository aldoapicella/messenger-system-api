import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDBModule } from '@app/shared/modules';
import { UserEntity } from '@app/shared/entities';

@Module({
  imports: [
    SharedModule,
    PostgresDBModule,

    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
