import { Module } from '@nestjs/common';
import { schoolAuthService } from './schoolAuth.service';
import { schoolAuthController } from './schoolAuth.controller';
import { SchoolService } from 'src/mainWeb/school/school.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from '../guards/jwt.guard';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [schoolAuthController],
  providers: [schoolAuthService, SchoolService,PrismaService, JwtService],
})
export class schoolAuthModule {}
