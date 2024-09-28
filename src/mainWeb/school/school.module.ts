import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  imports: [],
  controllers: [SchoolController],
  providers: [SchoolService,PrismaService,AppService],
})
export class SchoolModule {}
