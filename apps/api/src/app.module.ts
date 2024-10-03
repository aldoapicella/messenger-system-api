import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from '@app/shared';
import { RabbitMQConfigService } from '@app/shared/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (rabbitMQConfigService: RabbitMQConfigService) => {
        const queue = process.env.RABBITMQ_AUTH_QUEUE;
        return rabbitMQConfigService.createClient(queue);
      },
      inject: [RabbitMQConfigService],
    },
  ],
})
export class AppModule {}