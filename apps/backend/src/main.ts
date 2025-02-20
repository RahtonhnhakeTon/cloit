import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
