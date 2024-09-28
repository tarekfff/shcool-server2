import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './mainWeb/users/users.module';
import { PrismaService } from './prisma.service';
import { userAuthModule } from './mainWeb/auth/user/userAuth.module';
import { schoolAuthModule } from './mainWeb/auth/school/schoolAuth.module';

@Module({
 
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [ ConfigModule.forRoot(),UsersModule, schoolAuthModule, userAuthModule],
})
export class AppModule {}
