import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { isEmail, isNumberString } from 'class-validator';
import { UsersService } from 'src/mainWeb/users/users.service';
import { AuthDto } from '../dto/create-auth.dto';

@Injectable()
export class userAuthService {
  constructor(private user: UsersService, private jwt: JwtService) {}

  async login(dto: AuthDto) {
    let user;

    if (isNumberString(dto.userName)) {
      user = await this.user.findByNumber(dto.userName);
    } else {
      user = await this.user.findByUserName(dto.userName);
    }
    
    if (!(user && await compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...userInfo } = user;

    const payload = {
      id: user.id,
      email: user.number,
    };

    return {
      user: userInfo,
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

  async refreshToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
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
