import 'reflect-metadata';
import './types/express-augmentation';
import './config/dotenv.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { strip_untrusted_identity_headers } from '@common/middleware/strip-untrusted-identity-headers.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(strip_untrusted_identity_headers);
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.enableCors({ origin: '*' });
  //app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const swagger_config = new DocumentBuilder()
    .setTitle('Transversal MS')
    .setDescription('HTTP y mensajería SQS del microservicio Transversal')
    .setVersion('1.0')
    .addServer('/')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Access token de Amazon Cognito (token_use=access). Emisor: https://cognito-idp.{region}.amazonaws.com/{userPoolId}',
      },
      'cognito-access-token',
    )
    .build();
  const swagger_document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('docs', app, swagger_document, {
    jsonDocumentUrl: 'docs/json',
  });

  const config_service = app.get(ConfigService);
  const port = Number(config_service.get<string>('config.port') ?? 8080);
  const trust_hops = config_service.get<number>('security.trust_proxy_hops') ?? 0;
  if (Number.isFinite(trust_hops) && trust_hops > 0) {
    app.set('trust proxy', trust_hops);
  }

  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`Transversal MS (HTTP + SQS) escuchando en puerto ${port}`);
  logger.log(`Swagger UI: http://localhost:${port}/docs`);
}

void bootstrap();
