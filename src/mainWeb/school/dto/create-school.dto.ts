import { IsAscii, IsEmail, IsNotEmpty, IsNumberString, IsOptional, Length } from 'class-validator';

export class CreateSchoolDto {
    id?: number;
    @IsNotEmpty()
    @Length(4, 20)
    schoolName: string;

    @IsOptional()
    @IsNumberString()
    @Length(10)
    number?: string;
    
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

   
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsOptional() 
    firstDate?: string | Date;
    
    @IsOptional() 
    updateDate?: string | Date;

    @IsOptional() 
    plane?: number

    @IsOptional() 
    description?:string

    @IsOptional() 
    schema?:string
}
