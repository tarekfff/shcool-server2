import { ConflictException, Injectable, Ip, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma : PrismaService){}

  async createUser(createUserDto: CreateUserDto) {

    let isHere = await this.findByNumber(createUserDto.number);
    if(isHere)throw new ConflictException("number exicted");

    isHere = await this.findByUserName(createUserDto.userName);
    if(isHere)throw new ConflictException(" username exicted");
    try{
    const newUser = await this.prisma.user.create({
      data :{
        userName: createUserDto.userName,
        email: createUserDto.email || null,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        number:createUserDto.number,
        password: await hash(createUserDto.password,10) ,
        firstDate: new Date(),
      }
    })
 
    const{password,...user} = newUser;
    return user;
  }catch{
    throw new UnauthorizedException("cant register the user")
  }
  }

  async findAll(){
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const isHere = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return isHere;

  }
  async findByNumber(number: string) {
    return await this.prisma.user.findUnique({
      where: {
        number: number,
      },
    });
  }
  async findByUserName(userName: string) {
    return await this.prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });
  }
}
