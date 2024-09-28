import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateSchoolDto } from 'src/mainWeb/school/dto/create-school.dto';
import { SchoolService } from 'src/mainWeb/school/school.service';
import { schoolAuthService } from './schoolAuth.service';
import { AuthDto } from '../dto/create-auth.dto';
import { JwtRefreshGuard } from '../guards/refresh.guard';


@Controller('school/Auth')
export class schoolAuthController {
  constructor(private readonly schoolService: SchoolService, private readonly authService: schoolAuthService) {}

  @Post('register')
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.createschool(createSchoolDto);
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
