import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  // Enable CORS
  // app.enableCors({
  //   origin: 'http://localhost:3000', 
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  //   credentials: true, 
  // });
  // const prismaService = app.get(PrismaService);
  
  //app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}));
  await app.listen(3000, '0.0.0.0');
  // app.enableShutdownHooks();
  // process.on('SIGINT', async () => {
  //   await prismaService.closeAllClients();
  //   process.exit();
  // });
}

bootstrap();
