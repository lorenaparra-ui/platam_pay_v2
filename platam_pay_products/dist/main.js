"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
require("./config/dotenv.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = Number(configService.get("PORT") ?? 3000);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Accept",
    });
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Platam Products API")
        .setDescription("Microservicio de productos y backoffice para plataforma Platam.")
        .setVersion("1.0")
        .addTag("credit-applications-bnpl")
        .addTag("backoffice-credit-applications")
        .addTag("categories")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("docs", app, document);
    await app.listen(port, "0.0.0.0", () => {
        common_1.Logger.log(`app listening at ${configService.get("config.port")} with env ${configService.get("config.environment")}`, "main.ts");
    });
}
void bootstrap();
//# sourceMappingURL=main.js.map