import { SignupUserDto } from "@app/shared";

export interface IAuthenticationService {
    findAllUsers();
    signup(user: Readonly<SignupUserDto>): Promise<string>;
}