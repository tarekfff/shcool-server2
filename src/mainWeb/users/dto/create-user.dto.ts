import { IsAscii, IsEmail, isEmail, IsNotEmpty, IsNumberString, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
    id?: number;
    @IsNotEmpty()
    @Length(4, 20)
    userName: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(10)
    number: string;
    
    @IsNotEmpty()
    @Length(4, 12)
    firstName: string;
    
    @IsNotEmpty()
    @Length(4, 12)
    lastName: string;
    
    @IsNotEmpty()
    @Length(8, 30)
    @IsAscii()
    password: string;

    @IsOptional()
    @IsEmail()
    email?:string

    @IsOptional() 
    firstDate?: string | Date;
    
    @IsOptional() 
    school?: number[]

    @IsOptional() 
    schoolId?: number[]

}
