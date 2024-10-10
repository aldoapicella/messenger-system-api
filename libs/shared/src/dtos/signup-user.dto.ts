import { IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class SignupUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
    })
    password: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9_-]+$/, {
        message: 'Account username can only contain letters, numbers, underscores, and hyphens.'
    })
    username: string;

    @IsOptional()
    @Matches(/^[a-zA-Z0-9 ]+$/, { 
        message: 'Display name can only contain letters, numbers, and spaces.'
    })
    displayName?: string;
}
