import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@app/shared/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
