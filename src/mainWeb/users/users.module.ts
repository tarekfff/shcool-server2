import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService,PrismaService,AppService],
})
export class UsersModule {}
