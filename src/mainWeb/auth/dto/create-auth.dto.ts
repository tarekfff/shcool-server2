import { IsAscii, IsEmail, IsNotEmpty, isString, Length } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @Length(8, 30)
    @IsAscii()
    password: string;
}


