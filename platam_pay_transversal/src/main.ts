import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import './config/dotenv.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Habilitar CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  const options = new DocumentBuilder()
    .setTitle('💳 Platam API Services')
    .setDescription(
      'Platam API Services: BNPL, Factoring, and Confirming for enterprise financial platforms.',
    )
    .setVersion('1.0')
    .addTag('platam-api-services')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0', () => {
    Logger.log(
      `app listening at ${configService.get<number>('config.port')} with env ${configService.get<number>(
        'config.environment',
      )}`,
      'main.ts',
    );
  });
}

bootstrap();
