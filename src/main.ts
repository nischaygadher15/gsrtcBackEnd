import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS issue
  app.enableCors({
    origin: ['http://localhost:3000', 'https://gsrtc2025.vercel.app/'],
    credentials: true,
  });

  //Global pipe for payload validation
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
