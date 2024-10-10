import { IsString, IsNotEmpty, ValidateIf, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginUserDto {
    @ValidateIf((o) => !o.email && !!o.atLeastOneField)
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9_-]+$/, {
        message: 'Account username can only contain letters, numbers, underscores, and hyphens.',
    })
    username?: string;

    @ValidateIf((o) => !o.username && !!o.atLeastOneField)
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @ValidateIf((o) => o.username && o.email)
    @IsNotEmpty({ message: 'You cannot provide both username and email at the same time.' })
    onlyOneField?: string;

    @ValidateIf((o) => !o.username && !o.email)
    @IsNotEmpty({ message: 'You must provide either a username or an email.' })
    atLeastOneField?: string;
}
