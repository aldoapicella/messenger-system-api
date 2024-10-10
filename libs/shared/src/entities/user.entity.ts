import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SignupMethod } from '../enums';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({unique: true, name: 'email'})
  email: string;

  @Column({unique: true, name: 'username'})
  username: string;

  @Column({name: 'display_name'})
  displayName: string;

  @Column({name: 'password', select: false})
  password: string;

  @Column({name: 'profile_picture_url', nullable: true})
  profilePictureUrl: string;

  @Column({name: 'bio', nullable: true, length: 500})
  bio: string;

  // TODO: Implement signup method
  // @Column({name: 'signup_method', type: 'enum', enum: SignupMethod})
  // signupMethod: SignupMethod;

  @Column({name: 'is_email_verified', default: false})
  isEmailVerified: boolean;
}