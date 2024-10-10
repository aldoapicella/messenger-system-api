import { SignupUserDto } from "@app/shared";

export interface IAuthService {
    findAllUsers();
    signup(user: Readonly<SignupUserDto>): Promise<string>;
}