import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4321',
    credentials: true,
  });


  app.use((
    /** @type {import('express').Request} */
    _: Request,
    /** @type {import('express').Response} */
    res: Response,
    /** @type {import('express').NextFunction} */
    next: NextFunction
  ) => {
    res.removeHeader('X-Powered-By');
    res.removeHeader('Server');
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
