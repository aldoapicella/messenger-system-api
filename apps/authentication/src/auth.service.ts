import { UserEntity } from '@app/shared/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers() {
    return this.userRepository.find();
  }

  async saveUser() {
    return this.userRepository.save({ id: 1, name: 'John Doe' });
  }
}
