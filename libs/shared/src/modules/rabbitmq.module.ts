import { Module, DynamicModule } from '@nestjs/common';
import { RabbitMQService } from '../services';

@Module({
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