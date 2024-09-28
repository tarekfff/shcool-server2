import { ConflictException, Injectable, Ip, UnauthorizedException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { hash } from 'bcrypt';
import { isEmail } from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SchoolService {
  constructor(private prisma : PrismaService){}

  async createschool(createschoolDto: CreateSchoolDto) {

    if(!isEmail(createschoolDto.email))throw new ConflictException("enter an valid email");

    let isHere = await this.findByEmail(createschoolDto.email);
    if(isHere)throw new ConflictException("email exicted");

    try{
    const newschool = await this.prisma.school.create({
      data :{
        schoolName: createschoolDto.schoolName,
        email: createschoolDto.email,
        firstName: createschoolDto.firstName,
        lastName: createschoolDto.lastName,
        password: await hash(createschoolDto.password,10) ,
        schema :null,
        number:null,
        description:createschoolDto.description || null,
      }
    })
 
    const{password,...school} = newschool;
    return school;
  }catch{
    throw new UnauthorizedException("cant register the school")
  }
  }

  async findAll(){
    return await this.prisma.school.findMany();
  }

  async findOne(id: number) {
    const isHere = await this.prisma.school.findUnique({
      where: {
        id: id,
      },
    });
    return isHere;

  }
  async findByEmail(email: string) {
    return await this.prisma.school.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findByNumber(number: string) {
    return await this.prisma.school.findUnique({
      where: {
        number: number,
      },
    });
  }

}
