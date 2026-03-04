import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { CommonModule } from "@common/common.module";
import appConfig from "./config/app.config";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { PartnersModule } from "./modules/management/partners.module";
import { PartnerCategoriesModule } from "./modules/partner-categories/partner-categories.module";

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
    PartnerCategoriesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
