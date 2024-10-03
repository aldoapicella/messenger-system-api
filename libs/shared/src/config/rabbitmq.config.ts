import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport, ClientOptions } from '@nestjs/microservices';

@Injectable()
export class RabbitMQConfigService {
  constructor(private configService: ConfigService) {}

  createClientOptions(queue: string, noAck: boolean = true): ClientOptions {
    const USER = this.configService.get<string>('RABBITMQ_USER');
    const PASSWORD = this.configService.get<string>('RABBITMQ_PASS');
    const HOST = this.configService.get<string>('RABBITMQ_HOST');
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        noAck,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }
  
  createClient(queue: string) {
    return ClientProxyFactory.create(this.createClientOptions(queue));
  }
}