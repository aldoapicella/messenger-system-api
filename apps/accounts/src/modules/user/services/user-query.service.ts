import { UserEntity } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserQueryService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) { }
    async getOneById(userId: string): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { uuid: userId } });
    }

    async getOneByUsername(username: string): Promise <UserEntity> {
        return this.userRepository.findOne({ where: { username: username } });
    }

    async getAll(): Promise <UserEntity[]> {
        return this.userRepository.find();
    }


}
