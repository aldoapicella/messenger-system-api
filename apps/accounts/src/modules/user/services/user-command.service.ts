import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@app/shared';

@Injectable()
export class UserCommandService {
    constructor(
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}
}
