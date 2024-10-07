import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface IRabbitMQService {
  acknowledgeMessage(context: RmqContext): void;
}