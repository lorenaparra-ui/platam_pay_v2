import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import "./config/dotenv.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>("PORT") ?? 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept",
  });

  const options = new DocumentBuilder()
    .setTitle("Platam Products API")
    .setDescription(
      "Microservicio de productos y backoffice para plataforma Platam.",
    )
    .setVersion("1.0")
    .addTag("credit-applications-bnpl")
    .addTag("backoffice-credit-applications")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  await app.listen(port, "0.0.0.0", () => {
    Logger.log(
      `app listening at ${configService.get<number>("config.port")} with env ${configService.get<string>("config.environment")}`,
      "main.ts",
    );
  });
}

void bootstrap();
