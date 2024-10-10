import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SignupUserDto, UserEntity } from '@app/shared';

import { PasswordUtil } from './common/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAllUsers() {
    return this.userRepository.find();
  }

  async registerUser(signupUser: Readonly<SignupUserDto>): Promise<string> {
    const [usernameExists, emailExists] = await Promise.all([
      this.doesUserExist(signupUser.username),
      this.doesUserExist(signupUser.email),
    ]);

    if (usernameExists || emailExists) {
      throw new ConflictException(
        `An account with that ${usernameExists ? 'username' : 'email'} already exists.`
      );
    }

    const hashedPassword = await PasswordUtil.hashPassword(signupUser.password);

    const hashedUser = {
      ...signupUser,
      password: hashedPassword,
      displayName: signupUser.displayName || signupUser.username,
    };

    const newUser = await this.userRepository.save(hashedUser);

    return newUser.uuid;
  }

  /**
   * Checks if a user exists in the repository by their account ID or email.
   *
   * @param identifier - The account ID or email of the user to check.
   * @returns A promise that resolves to `true` if the user exists, otherwise `false`.
   */
  async doesUserExist(identifier: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [
        { username: identifier },
        { email: identifier }
      ]
    });
    return !!user;
  }
}
