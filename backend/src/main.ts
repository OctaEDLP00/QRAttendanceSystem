import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from '~/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.removeHeader('X-Powered-By');
    res.removeHeader('Server');
    next();
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
