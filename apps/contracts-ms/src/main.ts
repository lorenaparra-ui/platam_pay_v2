import 'reflect-metadata';
import './config/dotenv.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const swagger_config = new DocumentBuilder()
    .setTitle('Contracts MS')
    .setDescription('HTTP y mensajería SQS del microservicio de contratos')
    .setVersion('1.0')
    .addServer('/')
    .build();
  const swagger_document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('docs', app, swagger_document, {
    jsonDocumentUrl: 'docs/json',
  });

  const config_service = app.get(ConfigService);
  const port = Number(config_service.get<string>('config.port') ?? 8084);

  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`Contracts MS (HTTP + SQS) escuchando en puerto ${port}`);
  logger.log(`Swagger UI: http://localhost:${port}/docs`);
}

void bootstrap();
