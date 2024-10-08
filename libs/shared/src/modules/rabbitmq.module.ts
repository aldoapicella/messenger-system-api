import { Module, DynamicModule } from '@nestjs/common';
import { RabbitMQService } from '../services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    return {
      module: RabbitMQModule,
      providers: [
        {
          provide: service,
          useFactory: (rabbitMQService: RabbitMQService) => {
            return rabbitMQService.createClientProxy(queue);
          },
          inject: [RabbitMQService],
        },
      ],
      exports: [service],
    };
  }
}