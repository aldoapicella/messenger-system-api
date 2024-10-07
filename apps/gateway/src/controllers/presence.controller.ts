import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('presence')
export class PresenceController {
    constructor(
        @Inject('PRESENCE_SERVICE') private readonly presenceService: ClientProxy,
    ) {}

    @Get()
    async getPresence() {
        return this.presenceService.send({ cmd: 'get-presence' }, {});
    }
}
