import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { CommonModule } from "@common/common.module";
import appConfig from "./config/app.config";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { PartnersModule } from "./modules/management/partners.module";
import { BusinessesModule } from "./modules/businesses/businesses.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ".env",
    }),
    InfrastructureModule,
    CommonModule,
    PartnersModule,
    BusinessesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
