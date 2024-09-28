import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { isEmail, isNumberString} from 'class-validator';
import { SchoolService } from 'src/mainWeb/school/school.service';
import { AuthDto } from '../dto/create-auth.dto';

@Injectable()
export class schoolAuthService {
  constructor(private school: SchoolService, private jwt: JwtService) {}

  async login(dto: AuthDto) {
    let school;

    if (isEmail(dto.userName)) {
      school = await this.school.findByEmail(dto.userName);
    } else if (isNumberString(dto.userName)){
      school = await this.school.findByNumber(dto.userName);
    }else{
      throw new UnauthorizedException('Invalid credentials');
    }
    
    if (!(school && await compare(dto.password, school.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...schoolInfo } = school;

    const payload = {
      id: school.id,
      email: school.number,
    };

    return {
      school: schoolInfo,
      backendToken: {
        accessToken: await this.jwt.signAsync(payload, {
          expiresIn: '4h',
          secret: process.env.JWT_SECRET_ACCESS,
        }),
        refreshToken: await this.jwt.signAsync(payload, {
          expiresIn: '60d',
          secret: process.env.JWT_SECRET_REFRESH,
        }),
      },
    };
  }

  async refreshToken(school: any) {
    const payload = {
      id: school.id,
      email: school.email,
    };

    return {
      accessToken: await this.jwt.signAsync(payload, {
        expiresIn: '4h',
        secret: process.env.JWT_SECRET_ACCESS,
      }),
      refreshToken: await this.jwt.signAsync(payload, {
        expiresIn: '60d',
        secret: process.env.JWT_SECRET_REFRESH,
      }),
    };
  }
  
}
