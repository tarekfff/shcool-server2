import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ConflictException, Req, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/mainWeb/users/dto/create-user.dto';
import { UsersService } from 'src/mainWeb/users/users.service';
import { userAuthService } from './userAuth.service';
import { AuthDto } from '../dto/create-auth.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { JwtRefreshGuard } from '../guards/refresh.guard';


@Controller('user/Auth')
export class userAuthController {
  constructor(private readonly usersService: UsersService, private readonly authService: userAuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(){
    
    // return request['userid']
    // const resp  =  this.authService.refreshToken(Req.user);
    //  return resp;
  }

  @Post('login')
  login(@Body() loginDto: AuthDto){
    return this.authService.login(loginDto);
  }
}
