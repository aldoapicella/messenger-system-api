import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {

  @Get('health')
  getHealth() {
    return 'OK';
  }
}
