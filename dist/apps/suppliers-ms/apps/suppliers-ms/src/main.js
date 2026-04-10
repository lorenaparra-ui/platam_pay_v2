"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./config/dotenv.config");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const swagger_config = new swagger_1.DocumentBuilder()
        .setTitle('Suppliers MS')
        .setDescription('HTTP y mensajería SQS del microservicio Suppliers')
        .setVersion('1.0')
        .addServer('/')
        .build();
    const swagger_document = swagger_1.SwaggerModule.createDocument(app, swagger_config);
    swagger_1.SwaggerModule.setup('docs', app, swagger_document, {
        jsonDocumentUrl: 'docs/json',
    });
    const config_service = app.get(config_1.ConfigService);
    const port = Number(config_service.get('config.port') ?? 8080);
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Suppliers MS (HTTP + SQS) escuchando en puerto ${port}`);
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
}
void bootstrap();
//# sourceMappingURL=main.js.map