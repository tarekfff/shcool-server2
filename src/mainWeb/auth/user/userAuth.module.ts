import { Module } from '@nestjs/common';
import { userAuthService } from './userAuth.service';
import { userAuthController } from './userAuth.controller';
import { UsersService } from 'src/mainWeb/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from '../guards/jwt.guard';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [userAuthController],
  providers: [userAuthService, UsersService,PrismaService, JwtService],
})
export class userAuthModule {}
