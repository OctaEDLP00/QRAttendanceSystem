import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/app.module';

async function bootstrap() {
  // Usamos el AppModule que ya tiene registrados los otros módulos
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
